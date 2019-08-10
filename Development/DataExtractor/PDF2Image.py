import logging

class PDF2ImageConvertor:
	
	def __init__(self):
		pass

	def convert(self, filename, temp_folder):
		logging.info('{0} Created'.format(filename))
		from wand.image import Image as Img
		with Img(filename=filename, resolution=300) as img:
			img.compression_quality = 99
			img.save(filename=temp_folder+'/sample_scan.jpg')
		del Img