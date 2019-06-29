from __future__ import unicode_literals
import frappe
from frappe.utils import today

@frappe.whitelist()
def create_sales_order(applicant_name,employee_code,customer,service_charge):
    item = frappe.new_doc("Item")
    item.item_code = employee_code
    item.item_name = applicant_name
    item.description = "Larsen and Tubro"
    item.item_group= "Recruitment"
    item.stock_uom = "Nos"
    item.insert()
    item.save(ignore_permissions=True)
    so = frappe.new_doc("Sales Order")
    so.customer = "Larsen and Tubro"
    so.append("items", {
    "item_code": item.item_code,
    "item_name": item.item_name,
    "description": item.description,
    "uom": item.stock_uom,
    "rate":service_charge,
    "delivery_date": today()
    })
    so.insert()
    so.submit()
    so.save(ignore_permissions=True)
    return "Sales Order Created for Total value 40000"


# @frappe.whitelist()
# def create_salary_struct(doc,method):
#     if doc.status == "Accepted":
#         struct_id = frappe.db.get_value("Salary Structure", {"__newname": doc.name})
#         if struct_id:
#             struct = frappe.get_doc("Salary Structure", struct_id)
#         else:
#             struct = frappe.new_doc("Salary Structure")
#         salary_structure.update({"__newname" : doc.employee_code,
#         })
#         struct.set('earnings', [])
#         child = doc.earnings
#         for i in child:
#             struct.append("earnings",{
#                 "component" : i.basic_per_month,
#             }
#             )
    