import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import logging
 
class TableIdentification:    

    def __init__(self, NO_IMAGE):
        self.NO_IMAGE=NO_IMAGE        

    '''
        find_table(img_name) : Function
        imag_name : Parameter - imagefile with path
    '''
    def find_table(self, img_name):        

        logging.info('Table Analysis Module Loaded'.format(img_name))        

        # Read the image
        img = cv2.imread(img_name, 0)
        logging.info('Reading {0}'.format(img_name))

        # Thresholding the image
        (thresh, img_bin) = cv2.threshold(img, 128, 255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        # Invert the image
        img_bin = 255-img_bin
        if self.NO_IMAGE:
            cv2.imwrite("Image_bin.png",img_bin)

        logging.info('Created binary image of {0}'.format(img_name))

        # Defining a kernel length
        kernel_length = np.array(img).shape[1]//80
        logging.info('Kernel size of {0} is {1}'.format(img_name,kernel_length))
         
        # A verticle kernel of (1 X kernel_length), which will detect all the verticle lines from the image.
        verticle_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, kernel_length))
        # A horizontal kernel of (kernel_length X 1), which will help to detect all the horizontal line from the image.
        hori_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_length, 1))
        # A kernel of (3 X 3) ones.
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))

        # Morphological operation to detect vertical lines from an image
        img_temp1 = cv2.erode(img_bin, verticle_kernel, iterations=3)
        verticle_lines_img = cv2.dilate(img_temp1, verticle_kernel, iterations=3)
        if self.NO_IMAGE:
            cv2.imwrite("verticle_lines.png",verticle_lines_img)
        # Morphological operation to detect horizontal lines from an image
        img_temp2 = cv2.erode(img_bin, hori_kernel, iterations=3)
        horizontal_lines_img = cv2.dilate(img_temp2, hori_kernel, iterations=3)
        #cv2.imwrite("horizontal_lines.jpg",horizontal_lines_img)

        # Weighting parameters, this will decide the quantity of an image to be added to make a new image.
        alpha = 0.5
        beta = 1.0 - alpha
        # This function helps to add two image with specific weight parameter to get a third image as summation of two image.
        img_final_bin = cv2.addWeighted(verticle_lines_img, alpha, horizontal_lines_img, beta, 0.0)
        img_final_bin = cv2.erode(~img_final_bin, kernel, iterations=2)
        (thresh, img_final_bin) = cv2.threshold(img_final_bin, 128,255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        if self.NO_IMAGE:
            cv2.imwrite("img_final_bin.png",img_final_bin)

        logging.info('Basic table created from {0}'.format(img_name))

        # Find contours for image, which will detect all the boxes
        contours, hierarchy = cv2.findContours(img_final_bin, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        idx = 0
        x_arr = []
        y_arr = []
        name = []

        # Finding the table in the pdf
        for i in range(len(contours)):
            c = contours[i]
            x, y, w, h = cv2.boundingRect(c)
            new_img = img[y:y+h, x:x+w]
            
        w_arr = []
        h_arr = []
        images = []
        i = 0
        for c in contours:
            x, y, w, h = cv2.boundingRect(c)
            w_arr.append(w)
            h_arr.append(h)
            new_img = img[y:y+h, x:x+w]
            images.append(i)
            i = i + 1
            
        img_index = pd.DataFrame({'w':w_arr, 'h':h_arr, 'image':images}).sort_values(by=['w', 'h'], ascending=[0,0]).iloc[1].image
        x, y, w, h = cv2.boundingRect(contours[img_index])
        table = img[y:y+h, x:x+w]

        img = table

        img = cv2.copyMakeBorder(img, 100, 100, 100, 100, cv2.BORDER_CONSTANT, value=[255, 255, 255])
        logging.info('Stage 1 Contours Found from {0}'.format(img_name))
        #showImg(img, 'Table')

        # Redo the same operation
        # Thresholding the image
        (thresh, img_bin) = cv2.threshold(img, 128, 255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        # Invert the image
        img_bin = 255-img_bin
        if self.NO_IMAGE:
            cv2.imwrite("Image_bin.png",img_bin)

        # Defining a kernel length
        kernel_length = np.array(img).shape[1]//80
         
        # A verticle kernel of (1 X kernel_length), which will detect all the verticle lines from the image.
        verticle_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, kernel_length))
        # A horizontal kernel of (kernel_length X 1), which will help to detect all the horizontal line from the image.
        hori_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_length, 1))
        # A kernel of (3 X 3) ones.
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))

        # Morphological operation to detect vertical lines from an image
        img_temp1 = cv2.erode(img_bin, verticle_kernel, iterations=3)
        verticle_lines_img = cv2.dilate(img_temp1, verticle_kernel, iterations=3)
        if self.NO_IMAGE:
            cv2.imwrite("verticle_lines.png",verticle_lines_img)
        # Morphological operation to detect horizontal lines from an image
        img_temp2 = cv2.erode(img_bin, hori_kernel, iterations=3)
        horizontal_lines_img = cv2.dilate(img_temp2, hori_kernel, iterations=3)
        #cv2.imwrite("horizontal_lines.jpg",horizontal_lines_img)

        # Weighting parameters, this will decide the quantity of an image to be added to make a new image.
        alpha = 0.5
        beta = 1.0 - alpha
        # This function helps to add two image with specific weight parameter to get a third image as summation of two image.
        img_final_bin = cv2.addWeighted(verticle_lines_img, alpha, horizontal_lines_img, beta, 0.0)
        img_final_bin = cv2.erode(~img_final_bin, kernel, iterations=2)
        (thresh, img_final_bin) = cv2.threshold(img_final_bin, 128,255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        if self.NO_IMAGE:
            cv2.imwrite("img_final_bin.png",img_final_bin)

        logging.info('Stage 2 Contours Found from {0}'.format(img_name))

        # Find contours for image, which will detect all the boxes
        contours, hierarchy = cv2.findContours(img_final_bin, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        w_arr = []
        h_arr = []
        images = []
        idx = 0
        for c in contours:
            idx = idx + 1
            x, y, w, h = cv2.boundingRect(c)
            w_arr.append(w)
            h_arr.append(h)
            x_arr.append(x)
            y_arr.append(y)
            name.append(idx)
            images.append(idx)

        df = pd.DataFrame({'w':w_arr, 'h':h_arr, 'img':images, 'x':x_arr, 'y':y_arr})    

        logging.info('DataFrame Created from {0}'.format(img_name))
        logging.info('Contours found {0} from {1}'.format(len(contours), img_name))

        #print('No of contours : '+str(len(contours)))
        #print(df.shape)
        df = df.sort_values(by=['x', 'y'])[2:]
        #print('='*20)
        
        return (df, img)