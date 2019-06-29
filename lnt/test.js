frappe.ui.form.on("Job Applicant",{
    code_1:function(frm){
    frappe.call({
        method: 'frappe.client.get_value',
        args: {
            'doctype': 'Employee',
            'filters': {'user_id': frm.doc.code_1},
            'fieldname': [
                'employee_name','department','designation'
          ]
        },
        callback: function(r) {
        if (!r.exc) {
            frm.set_value("name_1",r.message.employee_name)
            frm.set_value("interviewer_designation_1",r.message.designation)
                    frm.set_value("interviewer_department_1",r.message.department)
    
                // code snippet
            }
        }
    }); 
    },
    code_2:function(frm){
    frappe.call({
        method: 'frappe.client.get_value',
        args: {
            'doctype': 'Employee',
            'filters': {'user_id': frm.doc.code_2},
            'fieldname': [
                'employee_name','department','designation'
          ]
        },
        callback: function(r) {
        if (!r.exc) {
            frm.set_value("name_2",r.message.employee_name)
            frm.set_value("designation_2",r.message.designation)
                    frm.set_value("department_2",r.message.department)
    
                // code snippet
            }
        }
    }); 
    },
    code_3:function(frm){
    frappe.call({
        method: 'frappe.client.get_value',
        args: {
            'doctype': 'Employee',
            'filters': {'user_id': frm.doc.code_3},
            'fieldname': [
                'employee_name','department','designation'
          ]
        },
        callback: function(r) {
        if (!r.exc) {
            frm.set_value("name_3",r.message.employee_name)
            frm.set_value("designation_3",r.message.designation)
                    frm.set_value("department_3",r.message.department)
    
                // code snippet
            }
        }
    }); 
    },
    dob:function(frm){
        var dob = new Date(frm.doc.dob);
        var now = new Date();
        var age_now = now.getFullYear() - dob.getFullYear();
      
        cur_frm.set_value("age", age_now);
        cur_frm.refresh();
    },
    onload: function (frm) {
        if (!frm.doc.applicant_number){
        frappe.call({
            "method": "frappe.client.get_list",
            args: {
                'doctype': "Job Applicant",
                order_by: "applicant_number",
            limit_page_length:5000,	
                filters: { "docstatus": 0 }
            },
            callback: function (r) {
                var name = r.message[r.message.length - 1]
                frappe.call({
                    "method": "frappe.client.get",
                    args: {
                        'doctype': "Job Applicant",
                        'name': name.name
                    },
                    callback: function (r) {
                   
                        new_code = parseInt(r.message.applicant_number) + 1
                        ecode = "JA-" + new_code.toString()
                        frm.set_value("erp_applicant_number", ecode)
                        frm.set_value("applicant_number", new_code)
                        
                    }
                })
            }
        })
    }
    }
    });
    