from PIL import Image
import os
import Constants

def convertPdfToImage(filename):
	from wand.image import Image as Img
	with Img(filename=filename, resolution=300) as img:
		img.compression_quality = 99
		img.save(filename='sample_scan.jpg')
	del Img

def OCR():
	import pytesseract
	#No preprocessing required here as the results are fairly good.
	text = pytesseract.image_to_string(Image.open(Constants.pdf_path))
	print(text)

if __name__=='__main__':
	convertPdfToImage(Constants.pdf_path_file)
	print('PDF converted to IMG.')