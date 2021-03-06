package com.legal.ai.crawler;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map.Entry;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import com.legal.ai.constants.Constants;

public class NCLTSpiderDelta {


    public static int getLastPage(WebDriver driver, String URL){

        String selector = "#block-system-main > div > div > div.item-list > ul > li.pager-last.last > a";
        int last_page=0;
        try {
            driver.get(URL);
            Thread.sleep(5000);  // Let the user actually see something!
        }
        catch (InterruptedException ex) {
            ex.printStackTrace();
        }
        try {
            driver.findElement(By.cssSelector(selector)).click();
            last_page = Integer.parseInt(driver.findElement(By.className("pager-current")).getText());
        }
        catch (Exception e) { e.printStackTrace(); }
        return last_page;
    }

    public static void main(String[] args) {

        try {

            System.setProperty("webdriver.chrome.driver", Constants.DRIVER_FOLDER);

            WebDriver driver = new ChromeDriver();

            String court;
            // Court number and number of page map

            HashMap<String, String> benchCourtMap = new HashMap<String, String>();
            benchCourtMap.put("Principal Bench~5365","Court-I~5379");
            benchCourtMap.put("New Delhi Bench Court-II~5366","Court-II~5386");
            benchCourtMap.put("New Delhi Bench Court-III~5367","Court-III~5381");
            benchCourtMap.put("New Delhi Bench Court-IV~5368","Court-IV~5387");
            benchCourtMap.put("New Delhi Bench Court-V~512971","Court-V~512975");
            benchCourtMap.put("New Delhi Bench Court-VI~512972","Court-VI~512976");
            benchCourtMap.put("Registrar NCLT~5369","Court-I~5382");
            benchCourtMap.put("Ahmedabad Bench~5370","Court-I~5388");
            benchCourtMap.put("Allahabad Bench~5371","Court-I~5383");
            benchCourtMap.put("Bengaluru Bench~5372","Court-I~5389");
            benchCourtMap.put("Chandigarh Bench~5373","Court-I~5384");
            benchCourtMap.put("Chennai Bench~5374","Court-I~5390:Court-II~5391");
            benchCourtMap.put("Guwahati Bench~5375","Court-I~5380");
            benchCourtMap.put("Hyderabad Bench~5376","Court-I~5392:Court-II~5393");
            benchCourtMap.put("Kolkata Bench~5377","Court-I~5385:Court II~28595");
            benchCourtMap.put("Mumbai Bench~5378","Court-III~5396:Main Board Court-I~5395:Main Board Court-II~5394");
            benchCourtMap.put("Jaipur Bench~119125","Court-I~119126");
            benchCourtMap.put("Cuttack Bench~364886","Court-I~364887");

            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
            //Date today = new Date();
            Date today = formatter.parse("23/03/2020");
            Date date;

            for(String bc_key : benchCourtMap.keySet()) {
                HashMap<String, String> courts = new HashMap<String, String>();
                String courtName = "file";
                String courtKey = bc_key;
                String courtId = courtKey.split("~")[1].trim();
                String courtFolder = courtKey.split("~")[0].trim();
                String set[] = benchCourtMap.get(courtKey).split(":");
                for(String eachKey : set) {
                    eachKey = eachKey.split("~")[1].trim();
                    courts.put(eachKey, "25");
                }
                String URL = "";
                List<WebElement> col = null;
                List<WebElement> rows = null;

                // Mkdir
                File directory = new File(Constants.Delta_FOLDER+courtFolder);
                if (! directory.exists()){
                    directory.mkdir();
                    directory = new File(Constants.Delta_FOLDER+courtFolder+""+File.separator+"pdf");
                    directory.mkdir();
                }

                BufferedWriter bw = new BufferedWriter(new FileWriter(Constants.Delta_FOLDER+courtFolder+"/"+courtName+".csv"));

                for(Entry<String, String> entry : courts.entrySet()) {
                    court = entry.getKey();
                    URL = "https://nclt.gov.in/pdf-cause-list?field_bench_target_id="+courtId+"&field_bench_court_target_id_entityreference_filter="+court;
                    //int last_page = getLastPage(driver, URL);
                    int last_page = 0;

                    last_page = last_page == 0 ? 1 : 2;
                    for(int page=0; page<last_page; page++) {

                        // hit the link to move the pagination
                        if(page == 0) {
                            URL = "https://nclt.gov.in/pdf-cause-list?field_bench_target_id="+courtId+"&field_bench_court_target_id_entityreference_filter="+court;
                        }
                        else {
                            URL = "https://nclt.gov.in/pdf-cause-list?field_bench_target_id="+courtId+"&field_bench_court_target_id_entityreference_filter="+court+"&page="+page;
                        }
                        System.out.println(URL);
                        driver.get(URL);
                        try {
                            Thread.sleep(5000);  // Let the user actually see something!
                        }
                        catch (Exception e) {  }

                        // no of cols
                        col = driver.findElements(By.xpath("//*[@id=\"block-system-main\"]/div/div/div[1]/table/thead/tr/th"));
                        //System.out.println(col.size());

                        // no of rows
                        rows = driver.findElements(By.xpath("//*[@id=\"block-system-main\"]/div/div/div[1]/table/tbody/tr"));
                        //System.out.println(rows.size());

                        String temp = "";

                        for(int i=2; i<=rows.size(); i++) {
                            temp = driver.findElement(By.xpath("//*[@id=\"block-system-main\"]/div/div/div[1]/table/tbody/tr["+i+"]/td["+col.size()+"]")).getText();
                            date = formatter.parse(temp.trim());
                            if (date.equals(today)) {
                                for(int j = 1; j<=col.size(); j++) {
                                    if(j == 5) {
                                        temp = driver.findElement(By.xpath("//*[@id=\"block-system-main\"]/div/div/div[1]/table/tbody/tr["+i+"]/td["+j+"]/a")).getAttribute("href");
                                    }
                                    else {
                                        temp = driver.findElement(By.xpath("//*[@id=\"block-system-main\"]/div/div/div[1]/table/tbody/tr["+i+"]/td["+j+"]")).getText();
                                    }
                                    //System.out.print(temp+"\t");
                                    bw.write(""+temp+Constants.SEP);
                                }
                                //System.out.println();
                                bw.write("\n");
                            }
                        }
                    }
                }
                bw.close();
            }
        }

        catch(Exception ex) {
            ex.printStackTrace();
        }

    }
}
