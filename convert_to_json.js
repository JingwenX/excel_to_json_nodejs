convertExcel = require('excel-as-json').processFile;
options = {sheet:'1', isColOriented: false, omitEmtpyFields: false}

excel_file = 'C:\\Users\\xuh\\Desktop\\excel_to_json_nodejs\\excel_file\\uplaod_domain_name.xlsx'
json_file = 'C:\\Users\\xuh\\Desktop\\excel_to_json_nodejs\\json_file\\upload_domain_name.json'


function mergeDict(dict1, dict2) {
  for(item in dict1) {
    dict2[item] = dict1[item];
  }
  return dict2;
}

convertExcel(excel_file, json_file, options, function (err, data) {
												if(err) {
													console.log(err)
												} else {
													//data = JSON.parse(body)

													//Modify this to access different JSON fields
													//console.log(data)
													//var dict = data
												

													// Concatenate the JSON object
													idx = 0
													temp_dict = {}
													output = {}
													
													for (i in data){
														console.log(data[i])
														console.log('i am here')
														console.log(i['CLASSIFICATION'])
														console.log(i['SUBCLASSIFICATION'])

														if ((i['CLASSIFICATION'] != null) && (i['SUBCLASSIFICATION'] != null)){
															//TODO: save the temp_dict to output dict 
															console.log('i am here2')
															mergeDict(temp_dict, output)

															console.log('cur temp_dict is' + temp_dict)
															console.log('cur output is' + output)
															temp_dict = {}

															for (attr in i['ATTRIBUTE']){
																temp_dict[attr] = {}
																//TODO: calculate the number
																temp_dict[attr]['NAME'] = 'I1xxx - ' + i['CLASSIFICATION'] + '/' + i['SUBCLASSIFICATION'] + ' - ' + i['ATTRIBUTE'][attr]
															}
															
														}
														// else{
														// 	//
														// 	temp_dict['']
													

														// }



													}
														


													// Save the output JSON back to file system
													const fs = require('fs');
													const content = JSON.stringify(output);

													fs.writeFile(json_file, content, 'utf8', function (err) {
													    if (err) {
													        return console.log(err);
													    }

													    console.log("The file was saved!");
													}); 
												}
											}
);

