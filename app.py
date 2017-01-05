import json
from flask import Flask, render_template, jsonify
from graph_backend import GraphData

app = Flask(__name__)

@app.route('/')
def test():
	return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
