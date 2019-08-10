
    function CreateTableFromJSON() {
        
        var myBooks = [
            {
                "Date": "01/03/2018",
				"City": "Chennai",                
                "CP/CA No": "12345",
                "Case Purpose": "Settlement",
				"Section":"SEC323",                                
                "Name of Petitioner": "Murali",
                "Name of Respondent": "Ajay",
				"Petitioner - Case Advocate": "Yadav",
                "Respondent - Case Advocate": "Kumar",
                "Links": "Summary | Full Judgement Copy"
                
            },
            {
				 "Date": "01/02/2019",
            	 "City": "New Delhi",                 
                 "CP/CA No": "89654",
                 "Case Purpose": "Settlement",                 
                 "Section":"SEC152",                	
                 "Name of Petitioner": "Arun",
                 "Name of Respondent": "Vinay",
				 "Petitioner - Case Advocate": "Arjun",
                 "Respondent - Case Advocate": "Sarabhjit",
				 "Links": "Summary | Full Judgement Copy"
            },
            {
				 "Date": "02/05/2019",
            	 "City": "Cuttack",                 
                 "CP/CA No": "98545",
                 "Case Purpose": "Judgement",                 
                 "Section":"SEC141",                	
                 "Name of Petitioner": "Saran",
                 "Name of Respondent": "Ravi",
				 "Petitioner - Case Advocate": "Samay",
                 "Respondent - Case Advocate": "Lalpat",
                 "Links": "Summary | Full Judgement Copy"
            },
            {
			"Date": "07/07/2018",
           	 "City": "Bengaluru",                
                "CP/CA No": "85258",
                "Case Purpose": "Settlement",                
                "Section":"SEC543",                	
                "Name of Petitioner": "Sridhar",
                "Name of Respondent": "Kajal",
				"Petitioner - Case Advocate": "Mani",
                "Respondent - Case Advocate": "Shital",
                "Links": "Summary | Full Judgement Copy"
           },
           {
		   "Date": "18/12/2018",
          	 "City": "Kolkatta",               
               "CP/CA No": "45654",
               "Case Purpose": "Settlement",               
               "Section":"SEC454",                	
               "Name of Petitioner": "Siva",
               "Name of Respondent": "Rajesh",
			   "Petitioner - Case Advocate": "Pratik",
               "Respondent - Case Advocate": "Atul",
               "Links": "Summary | Full Judgement Copy"
          },
          {
			  "Date": "13/11/2017",
         	  "City": "Ahmedabad",              
              "CP/CA No": "88854",
              "Case Purpose": "Judgement",              
              "Section":"SEC11223",                	
              "Name of Petitioner": "Shekar",
              "Name of Respondent": "Dhanaesh",
			  "Petitioner - Case Advocate": "Suman",
              "Respondent - Case Advocate": "Mantra",
              "Links": "Summary | Full Judgement Copy"
         },
         {
		 "Date": "29/03/2018",
        	 "City": "Guwahati",             
             "CP/CA No": "123222",
             "Case Purpose": "Settlement",             
             "Section":"SEC2355",                	
             "Name of Petitioner": "Jayasank",
             "Name of Respondent": "Aravind",
			 "Petitioner - Case Advocate": "Manesh",
             "Respondent - Case Advocate": "Mehta",
             "Links": "Summary | Full Judgement Copy"
        },
        {
		"Date": "21/06/2018",
       	 "City": "Chandigarh",            
            "CP/CA No": "555455",
            "Case Purpose": "Settlement",            
            "Section":"SEC3888",                	
            "Name of Petitioner": "Partha",
            "Name of Respondent": "Shrabu",
            "Respondent - Case Advocate": "Seeman",
			"Petitioner - Case Advocate": "Ramanath",
            "Links": "Summary | Full Judgement Copy"
       },
       {
	   "Date": "20/04/2019",
      	 "City": "Mumbai",           
           "CP/CA No": "659852",
           "Case Purpose": "Judgement",           
           "Section":"SEC88523",                	
           "Name of Petitioner": "Vandhana",
           "Name of Respondent": "Radhika",
		   "Petitioner - Case Advocate": "Jagan",
           "Respondent - Case Advocate": "Kamlesh",
           "Links": "Summary | Full Judgement Copy"
      }            
        ]

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
		table.setAttribute('class', 'table table-striped table-bordered');
		//table.setAttribute('id', 'example');
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }


function CreateTableFromJSONWithCriteria() {	

        var myBooks = [
            {
                "Date": "01/03/2018",
				"City": "Chennai",                
                "CP/CA No": "12345",
                "Case Purpose": "Settlement",
				"Section":"SEC323",                                
                "Name of Petitioner": "Murali",
                "Name of Respondent": "Ajay",
				"Petitioner - Case Advocate": "Yadav",
                "Respondent - Case Advocate": "Kumar",
                "Links": "Summary | Full Judgement Copy"
                
            },
            {
				 "Date": "01/02/2019",
            	 "City": "New Delhi",                 
                 "CP/CA No": "89654",
                 "Case Purpose": "Settlement",                 
                 "Section":"SEC152",                	
                 "Name of Petitioner": "Arun",
                 "Name of Respondent": "Vinay",
				 "Petitioner - Case Advocate": "Arjun",
                 "Respondent - Case Advocate": "Sarabhjit",
                 "Links": "Summary | Full Judgement Copy"
            },
            {
				 "Date": "02/05/2019",
            	 "City": "Cuttack",                 
                 "CP/CA No": "98545",
                 "Case Purpose": "Judgement",                 
                 "Section":"SEC141",                	
                 "Name of Petitioner": "Saran",
                 "Name of Respondent": "Ravi",
				 "Petitioner - Case Advocate": "Samay",
                 "Respondent - Case Advocate": "Lalpat",
                 "Links": "Summary | Full Judgement Copy"
            },
            {
			"Date": "07/07/2018",
           	 "City": "Bengaluru",                
                "CP/CA No": "85258",
                "Case Purpose": "Settlement",                
                "Section":"SEC543",                	
                "Name of Petitioner": "Sridhar",
                "Name of Respondent": "Kajal",
				"Petitioner - Case Advocate": "Mani",
                "Respondent - Case Advocate": "Shital",
                "Links": "Summary | Full Judgement Copy"
           },
           {
		   "Date": "18/12/2018",
          	 "City": "Kolkatta",               
               "CP/CA No": "45654",
               "Case Purpose": "Settlement",               
               "Section":"SEC454",                	
               "Name of Petitioner": "Siva",
               "Name of Respondent": "Rajesh",
			   "Petitioner - Case Advocate": "Pratik",
               "Respondent - Case Advocate": "Atul",
               "Links": "Summary | Full Judgement Copy"
          },
          {
			  "Date": "13/11/2017",
         	  "City": "Ahmedabad",              
              "CP/CA No": "88854",
              "Case Purpose": "Judgement",              
              "Section":"SEC11223",                	
              "Name of Petitioner": "Shekar",
              "Name of Respondent": "Dhanaesh",
			  "Petitioner - Case Advocate": "Suman",
              "Respondent - Case Advocate": "Mantra",
              "Links": "Summary | Full Judgement Copy"
         },
         {
		 "Date": "29/03/2018",
        	 "City": "Guwahati",             
             "CP/CA No": "123222",
             "Case Purpose": "Settlement",             
             "Section":"SEC2355",                	
             "Name of Petitioner": "Jayasank",
             "Name of Respondent": "Aravind",
			 "Petitioner - Case Advocate": "Manesh",
             "Respondent - Case Advocate": "Mehta",
             "Links": "Summary | Full Judgement Copy"
        },
        {
		"Date": "21/06/2018",
       	 "City": "Chandigarh",            
            "CP/CA No": "555455",
            "Case Purpose": "Settlement",            
            "Section":"SEC3888",                	
            "Name of Petitioner": "Partha",
            "Name of Respondent": "Shrabu",
            "Respondent - Case Advocate": "Seeman",
			"Petitioner - Case Advocate": "Ramanath",
            "Links": "Summary | Full Judgement Copy"
       },
       {
	   "Date": "20/04/2019",
      	 "City": "Mumbai",           
           "CP/CA No": "659852",
           "Case Purpose": "Judgement",           
           "Section":"SEC88523",                	
           "Name of Petitioner": "Vandhana",
           "Name of Respondent": "Radhika",
		   "Petitioner - Case Advocate": "Jagan",
           "Respondent - Case Advocate": "Kamlesh",
           "Links": "Summary | Full Judgement Copy"
      }            
        ]

var fromDate = document.getElementById("fromDate").value;
var toDate = document.getElementById("toDate").value;
var city = document.getElementById("myCityInput").value;
var cpca = document.getElementById("cpcaNumber").value;
var casePurpose = document.getElementById("casePurpose").value;
var section = document.getElementById("section").value;
var nameOfPetitioner = document.getElementById("nameOfPetitioner").value;
var nameOfRespondent = document.getElementById("nameOfRespondent").value;
var petitionerCaseAdv = document.getElementById("petitionerCaseAdv").value;
var respondentCaseAdv = document.getElementById("respondentCaseAdv").value;



        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];		
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);					
                }
            }
        }
		var criteriaCol = [fromDate, city, cpca, casePurpose, section, nameOfPetitioner, nameOfRespondent, petitionerCaseAdv, respondentCaseAdv, ""];
 
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");  
		table.setAttribute('class', 'table table-striped table-bordered');
		table.setAttribute('id', 'tabledata');
	
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {        	
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }        						

		var totalRowCount = 0;
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {
            tr = table.insertRow(-1);
			var k = -1;
            for (var j = 0; j < col.length; j++) {																								
				if(criteriaCol[j] == "" ) 
				{
					k = 1;
				}	
				else if (criteriaCol[j] == myBooks[i][col[j]])
				{
					k = 1;
				}	
				else {
					k = -1;
					break;
				}
            }
			if(k == 1)
			{				
				for (var j = 0; j < col.length; j++) {	
					var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = myBooks[i][col[j]];	
					totalRowCount++;
				 }
			}			
        }
		
		if(totalRowCount == 0){			
			alert("No Results Found!!");
		}
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.		
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);	               
    }
	
	
	/*
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myDIV *").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
*/


// Get the element with id="defaultOpen" and click on it
/*document.getElementById("defaultOpen").click(); */

function ClearTable() {	

document.getElementById("fromDate").innerHTML = "";
document.getElementById("toDate").innerHTML = "";
document.getElementById("myCityInput").innerHTML = "";
document.getElementById("cpcaNumber").innerHTML = "";
document.getElementById("casePurpose").innerHTML = "";
document.getElementById("section").innerHTML = "";
document.getElementById("nameOfPetitioner").innerHTML = "";
document.getElementById("nameOfRespondent").innerHTML = "";
document.getElementById("petitionerCaseAdv").innerHTML = "";
document.getElementById("respondentCaseAdv").innerHTML = "";

        var myBooks = [
            {                                
            }                     
        ]

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];

        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

 
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");  
		table.setAttribute('id', 'tabledata');	
		table.setAttribute('class', 'table table-striped table-bordered');		
	
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {        	
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }        						

		
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);		
    }
	
	
function searchFunctionOrg() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");  
  filter = input.value.toUpperCase();  
  table = document.getElementById("tabledata");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {	  
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

function searchFunction() {
  // Declare variables    
  var input = document.getElementById("myInput").value;
  if(input == "")
  {
	  ClearTable();
  }
  else{
  
    var myBooks = [
            {
                "Date": "01/03/2018",
				"City": "Chennai",                
                "CP/CA No": "12345",
                "Case Purpose": "Settlement",
				"Section":"SEC323",                                
                "Name of Petitioner": "Murali",
                "Name of Respondent": "Ajay",
				"Petitioner - Case Advocate": "Yadav",
                "Respondent - Case Advocate": "Kumar",
                "Links": "Summary | Full Judgement Copy"
                
            },
            {
				 "Date": "01/02/2019",
            	 "City": "New Delhi",                 
                 "CP/CA No": "89654",
                 "Case Purpose": "Settlement",                 
                 "Section":"SEC152",                	
                 "Name of Petitioner": "Arun",
                 "Name of Respondent": "Vinay",
				 "Petitioner - Case Advocate": "Arjun",
                 "Respondent - Case Advocate": "Sarabhjit",
                 "Links": "Summary | Full Judgement Copy"
            },
            {
				 "Date": "02/05/2019",
            	 "City": "Cuttack",                 
                 "CP/CA No": "98545",
                 "Case Purpose": "Judgement",                 
                 "Section":"SEC141",                	
                 "Name of Petitioner": "Saran",
                 "Name of Respondent": "Ravi",
				 "Petitioner - Case Advocate": "Samay",
                 "Respondent - Case Advocate": "Lalpat",
                 "Links": "Summary | Full Judgement Copy"
            },
            {
			"Date": "07/07/2018",
           	 "City": "Bengaluru",                
                "CP/CA No": "85258",
                "Case Purpose": "Settlement",                
                "Section":"SEC543",                	
                "Name of Petitioner": "Sridhar",
                "Name of Respondent": "Kajal",
				"Petitioner - Case Advocate": "Mani",
                "Respondent - Case Advocate": "Shital",
                "Links": "Summary | Full Judgement Copy"
           },
           {
		   "Date": "18/12/2018",
          	 "City": "Kolkatta",               
               "CP/CA No": "45654",
               "Case Purpose": "Settlement",               
               "Section":"SEC454",                	
               "Name of Petitioner": "Siva",
               "Name of Respondent": "Rajesh",
			   "Petitioner - Case Advocate": "Pratik",
               "Respondent - Case Advocate": "Atul",
               "Links": "Summary | Full Judgement Copy"
          },
          {
			  "Date": "13/11/2017",
         	  "City": "Ahmedabad",              
              "CP/CA No": "88854",
              "Case Purpose": "Judgement",              
              "Section":"SEC11223",                	
              "Name of Petitioner": "Shekar",
              "Name of Respondent": "Dhanaesh",
			  "Petitioner - Case Advocate": "Suman",
              "Respondent - Case Advocate": "Mantra",
              "Links": "Summary | Full Judgement Copy"
         },
         {
		 "Date": "29/03/2018",
        	 "City": "Guwahati",             
             "CP/CA No": "123222",
             "Case Purpose": "Settlement",             
             "Section":"SEC2355",                	
             "Name of Petitioner": "Jayasank",
             "Name of Respondent": "Aravind",
			 "Petitioner - Case Advocate": "Manesh",
             "Respondent - Case Advocate": "Mehta",
             "Links": "Summary | Full Judgement Copy"
        },
        {
		"Date": "21/06/2018",
       	 "City": "Chandigarh",            
            "CP/CA No": "555455",
            "Case Purpose": "Settlement",            
            "Section":"SEC3888",                	
            "Name of Petitioner": "Partha",
            "Name of Respondent": "Shrabu",
            "Respondent - Case Advocate": "Seeman",
			"Petitioner - Case Advocate": "Ramanath",
            "Links": "Summary | Full Judgement Copy"
       },
       {
	   "Date": "20/04/2019",
      	 "City": "Mumbai",           
           "CP/CA No": "659852",
           "Case Purpose": "Judgement",           
           "Section":"SEC88523",                	
           "Name of Petitioner": "Vandhana",
           "Name of Respondent": "Radhika",
		   "Petitioner - Case Advocate": "Jagan",
           "Respondent - Case Advocate": "Kamlesh",
           "Links": "Summary | Full Judgement Copy"
      }            
        ]

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];		
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);					
                }
            }
        }		
 
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");  
		table.setAttribute('class', 'table table-striped table-bordered');
		table.setAttribute('id', 'tabledata');
	
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
		var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

  var filter, td, txtValue, temptxtValue;    
  filter = input.toUpperCase(); 
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {
            tr = table.insertRow(-1);
			var matchfound = -1;
            for (var j = 0; j < col.length; j++) {                              			
						temptxtValue = myBooks[i][col[j]];
						//alert(txtValue);
						if (temptxtValue.toUpperCase().indexOf(filter) > -1) {
							matchfound = 1;
							break;
							} 							 
            }
						if(matchfound == 1) {
			            for (var j = 0; j < col.length; j++) {
							var tabCell = tr.insertCell(-1);                				
							txtValue = myBooks[i][col[j]];											
							tabCell.innerHTML = myBooks[i][col[j]];														
            }
						}			
        }
		
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.		
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);	
  }		
}