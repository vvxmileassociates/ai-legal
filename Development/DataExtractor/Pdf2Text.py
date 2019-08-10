#!/usr/bin/env python
#from PIL import Image
from SolrClient import SolrClient
import os
import shutil
#import pytesseract
import logging
#from TableAnalysis import TableIdentification
#import cv2

pdf_input_path = "./input/"
pdf_output_path = "./output/"
NO_OF_COLS = 8

logging.basicConfig(format='[%(levelname)s]: %(message)s', level=logging.INFO)

def convertPdfToImage(filename):
	logging.info('PDF2IMG Module Loaded')
	# create a temp folder to save images
	temp_folder = pdf_output_path + 'temp_' + filename.split('.')[0]
	if os.path.isdir(temp_folder):
		logging.warning('Removing {0}'.format(temp_folder))
		shutil.rmtree(temp_folder)
	os.mkdir(temp_folder)

	logging.info('{0} Created'.format(temp_folder))

	from PDF2Image import PDF2ImageConvertor
	convertor = PDF2ImageConvertor()
	convertor.convert(pdf_input_path + filename, temp_folder)

	logging.info('PDF converted to image in {0}'.format(temp_folder))
	return temp_folder

def removeDirectory(folder):
	try:
		files = [i for i in os.listdir(folder)]
		for i in files:
			os.remove(i)
	except:
		logging.error('Not able to remove directory {0}'.format(folder))


def convertImg2Table(temp_folder, solr):
	
	image_files = [i for i in os.listdir(temp_folder) if i.split('.')[1] == 'jpg']

	#temp_folder = pdf_output_path + 'temp_' + 'CHENNAI'

	import cv2
	from TableAnalysis import TableIdentification

	ti = TableIdentification(NO_IMAGE=False)

	for each_image in image_files:
		# Initialisation of variables
		text_arr = []
		tmp_arr = []
		pointer = 0

		i_file = temp_folder+'/'+each_image
		df, img = ti.find_table(i_file)
		
		logging.info('Extracting images from {0}'.format(i_file))
		for index, row in df.sort_values(by=['y', 'x'], ascending=[1, 1]).iterrows():
			new_img = img[row.y:row.y+row.h, row.x:row.x+row.w]
			# cv2.imwrite(temp_folder+'/'+str(row.img) + '.png', new_img)
			txt = show_text(new_img, row.img)
			tmp_arr.append(txt)
			if ((pointer % NO_OF_COLS) + 1) == NO_OF_COLS:
				text_arr.append(tmp_arr[::-1])
				if len(tmp_arr) != NO_OF_COLS:
					logging.error('NO_OF_COLS are not matching Received = {0}, NO_OF_COLS = {1}'.format(len(tmp_arr), NO_OF_COLS))
				tmp_arr = []
			pointer += 1

		f = open(temp_folder+'/'+each_image.split('.')[0]+'.csv', 'w+')
		for i in text_arr:
			for j in i:
				f.write(j+'\t')
			f.write('\n')
		f.close()

		logging.info('{0} Created'.format(each_image.split('.')[0]+'.csv'))

		docs = []
		for row in text_arr:
			d = {}
			for index in range(len(row)):
				d['field'+str(index)] = row[index]
			docs.append(d)
			try:
				Solr.index('collection1', d)
				solr.commit('collection1', softCommit=True)
			except:
				print('error')
				print(d)
	logging.info('Solr indexing done')

	del cv2

def driver():
	logging.info('Driver Program Loaded')
	logging.info('--'*20)
	pdf_files = [i for i in os.listdir(pdf_input_path) if i.split('.')[1] == 'pdf']
	solr = SolrClient('http://localhost:8983/solr')
	logging.info('No of files in {0} is {1}'.format(pdf_input_path, len(pdf_files)))
	for pdf in pdf_files:
		temp_folder = convertPdfToImage(pdf)
		convertImg2Table(temp_folder, solr)
	logging.info('Image Convertion Done')


def show_text(img, file):
	txt = stage1Tesseract(img)
	return txt

def stage1Tesseract(img):
	import pytesseract
	txt = pytesseract.image_to_string(img)
	txt = txt.replace('\r', ' ').replace('\n', ' ')
	if txt == '':
		return stage2Tesseract(img)
	return txt

def indexSolr(solr, data):
	pass

def stage2Tesseract(img):
	try:
		import pytesseract
		grey_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
		ret, bin_img = cv2.threshold(grey_img, 127, 255, cv2.THRESH_BINARY)
		kernel = np.ones((3,3),dtype='uint8')
		dilation = cv2.dilate(bin_img, kernel, iterations=1)
		dilation = cv2.morphologyEx(dilation, cv2.MORPH_OPEN, kernel)
		txt = pytesseract.image_to_string(dilation, config=" --psm 7")
	except:
		txt = ''
	return txt

if __name__=='__main__':
	
	driver()
