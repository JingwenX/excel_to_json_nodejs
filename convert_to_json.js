convertExcel = require('excel-as-json').processFile;
options = {sheet:'1', isColOriented: false, omitEmtpyFields: false}

convertExcel('C:\\Users\\xuh\\Desktop\\excel_to_json_nodejs\\excel_file\\uplaod_domain_name.xlsx', 'C:\\Users\\xuh\\Desktop\\excel_to_json_nodejs\\json_file\\upload_domain_name.json', options);