import configparser
from collections import Counter
from datetime import datetime, timedelta
from dateutil.rrule import rrule, MONTHLY
import json
from flask import render_template
from flask.views import View
import pyrebase

class GraphData(View):
	def __init__(self, debug = False):
		self.debug = debug
		self.config = configparser.ConfigParser()
		self.config.optionxform = str
		self.config.read("firebase_auth.cfg")
		self.config = dict(self.config._sections['Parameters'])
		self.firebase = pyrebase.initialize_app(self.config)
		self.db = self.firebase.database()
		self.dashboard = self.db.child("dashboard").get()
		self.contacts = self.db.child("contacts").get()

	def dispatch_request(self):
		if not self.debug:
			number_sales_per_month = self.number_sales_per_month()
			cur_expt_sales = self.cur_expt_sales()
			return render_template('index.html', 
								my_var = 'Make America Great Again!',
								my_list = json.dumps([0, 1, 2, 3]),
								cur_expt_sales = json.dumps(cur_expt_sales),
								number_sales_per_month = json.dumps(number_sales_per_month)
								)

	def number_sales_per_month(self):
		'''
		Graph showing number of sales going on per month.
		Can be shown as a barchart. 
		'''
		data = {"column_id" : [], "graph" : []}
		for column in self.dashboard.each():
			column_id = column.key()
			if not column.val(): continue

			sales = Counter()
			for user_id, user_data in column.val().items():
				start, end = datetime.strptime(user_data["startDate"], "%m/%d/%Y"), \
							 datetime.strptime(user_data["endDate"], "%m/%d/%Y")
				start, end = start.replace(day = 1), end.replace(day = 1)
				months = [dt.strftime("%Y-%m") 
						  for dt in rrule(MONTHLY, dtstart=start, until=end)]
				for month in months:
					sales[month] += 1

			sales = dict(sales)
			sales = {"x" : list(sales.keys()), "y" : list(sales.values()),
					"xaxis" : "x" + str(column_id), "yaxis" : "y" + str(column_id)}

			data["column_id"].append(column_id)
			data["graph"].append(sales)

		if self.debug: self._plot_number_sales_per_month(data)

		return data

	def cur_expt_sales(self):
		'''
		Get the total average amount of current and expected sales
		over the time range of all the ongoing sales. Done for each 
		column. Corresponding graph will have multiple tabs, one for each column. 
		'''
		data = {"column_id" : [], "graph" : []}
		for column in self.dashboard.each():
			column_id = column.key()
			if not column.val(): continue

			dates = []
			sales = []
			start_date, end_date = datetime.max, datetime.min
			for user_id, user_data in column.val().items():
				start, end = datetime.strptime(user_data["startDate"], "%m/%d/%Y"), \
							 datetime.strptime(user_data["endDate"], "%m/%d/%Y")
				current, expected = float(user_data["currSales"]), float(user_data["expSales"])

				avg_current = current / (end - start).days
				avg_expected = expected / (end - start).days
				dates.append((start, end))
				sales.append((avg_current, avg_expected))
				start_date = min(start, start_date)
				end_date = max(end, end_date)

			num_days = (end_date - start_date).days + 1
			date_range = [(start_date + timedelta(days = i)).strftime("%Y-%m-%d") 
						  for i in range(num_days)]
			total_current = [0] * num_days
			total_expected = [0] * num_days

			for i in range(len(dates)):
				for j in range((dates[i][0] - start_date).days, (dates[i][1] - start_date).days + 1):
					total_current[j] += sales[i][0]
					total_expected[j] += sales[i][1]

			data["column_id"].append(column_id)
			data["graph"].append({"x" : date_range, "y" : total_current, 
								"xaxis" : "x" + str(column_id), "yaxis" : "y" + str(column_id)})
			data["graph"].append({"x" : date_range, "y" : total_expected, 
								"xaxis" : "x" + str(column_id), "yaxis" : "y" + str(column_id)})

		if self.debug: self._plot_cur_expt_sales(data)

		return data

	def _plot_number_sales_per_month(self, data):
		'''
		Plot number of sales per month using matplotlib. Testing only. 
		'''
		import matplotlib.pyplot as plt
		fig, axes = plt.subplots(2, 2)
		for index, item in enumerate(data["column_id"]):
			col_number = int(item) - 1
			num_ticks = len(data["graph"][index]["x"])
			axes[col_number // 2][col_number % 2].bar(range(num_ticks),
													  data["graph"][index]["y"])
			axes[col_number // 2][col_number % 2].set_xticklabels(data["graph"][index]["x"])

		plt.show()

	def _plot_cur_expt_sales(self, data):
		'''
		Plot current and expected sales per month using matplotlib. Testing only. 
		'''
		import matplotlib.pyplot as plt
		fig, axes = plt.subplots(2, 2)
		for index, item in enumerate(data["column_id"]):
			col_number = int(item) - 1
			num_ticks = len(data["graph"][2 * index]["x"])
			axes[col_number // 2][col_number % 2].plot(range(num_ticks),
													  data["graph"][2 * index]["y"])
			axes[col_number // 2][col_number % 2].plot(range(num_ticks),
													  data["graph"][2 * index + 1]["y"])
			axes[col_number // 2][col_number % 2].set_xticklabels(data["graph"][2 * index]["x"])
			
		plt.show()


if __name__ == "__main__":
	gd = GraphData(debug = True)
	gd.cur_expt_sales()
	gd.number_sales_per_month()