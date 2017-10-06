convertExcel = require('excel-as-json').processFile;
options = {sheet:'1', isColOriented: false, omitEmtpyFields: false}


excel_file = 'C:\\Users\\xuh\\Desktop\\ori_excel_to_json\\excel_to_json_nodejs\\excel_file\\uplaod_domain_name.xlsx'
json_file = 'C:\\Users\\xuh\\Desktop\\ori_excel_to_json\\excel_to_json_nodejs\\json_file\\upload_domain_name.json'
json_file2 = 'C:\\Users\\xuh\\Desktop\\ori_excel_to_json\\excel_to_json_nodejs\\json_file\\upload_domain_name3.json'

reg = /\(([0-9)]+)\)/


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
													//var data = JSON.parse(data)

													var dict = data //this line is important

													// Concatenate the JSON object
													idx = 0
													temp_dict = {}
													output = {}
													
													for (i in dict){
														if ((dict[i]['CLASSIFICATION'] != "") && (!dict[i]['CLASSIFICATION'].includes('Attribute heading') ) ){
															//TODO: save the temp_dict to output dict 
															//for(item in temp_dict) {
															//  output[item] = temp_dict[item];
															//}

															key = dict[i]['CLASSIFICATION'] + '/' + dict[i]['SUBCLASSIFICATION']

															temp_dict = {}

															for (attr in data[i]['ATTRIBUTE']){
																//console.log(attr);
																if (data[i]['ATTRIBUTE'][attr].trim() != ""){
																 	temp_dict[attr] = {};
																 	//TODO: calculate the number
																 	if (data[i]['SUBCLASSIFICATION'].trim() != ""){
																 		temp_dict[attr]['NAME'] = data[i]['CLASSIFICATION'].replace(reg, "").trim() + '/' + data[i]['SUBCLASSIFICATION'].replace(reg, "").trim() + ' - ' + data[i]['ATTRIBUTE'][attr].replace(reg, "").trim()
																		}
																	else{
																 		temp_dict[attr]['NAME'] = data[i]['CLASSIFICATION'].replace(reg, "").trim() + ' - ' + data[i]['ATTRIBUTE'][attr].replace(reg, "").trim()
																		}
																	}
															}

															output[key] = temp_dict


															//make each attribute a json
															for (attr in temp_dict){
																temp_dict[attr]['VALUES'] = []
															}
															// console.log(temp_dict)
															
														}
														else{
															// if (dict[i]['ATTRIBUTE']['attr1'] != ""){
															// 	console.log(dict[i]['ATTRIBUTE']['attr1'])
															// 	}
															for (val in dict[i]['ATTRIBUTE']){ // val = attr1, attr2...
																if (dict[i]['ATTRIBUTE'][val].toString().trim() != ""){
																	// console.log(temp_dict[val])
																	temp_dict[val]['VALUES'].push(dict[i]['ATTRIBUTE'][val])
																	// console.log(temp_dict)

																}
															}

															}
														}
													//beautifying the output
													// console.log(output)
													// final_output  = {}
													// for (item in output){
													// 	for (attr in item){

													// 	}
													// }

													// Save the output JSON back to file system
													const fs = require('fs');
													const content = JSON.stringify(output);

													fs.writeFile(json_file2, content, 'utf8', function (err) {
													    if (err) {
													        return console.log(err);
													    }

													    console.log("The file was saved!");

													}); 


														}
													}
													);