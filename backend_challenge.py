from flask import Flask
from flask import jsonify
#from flask import json
import json
from flask import request

# To run this program, run the following command on bash:
# $python backend_challenge.py

app = Flask(__name__)

# To send HTTP POST to program, run the following command on bash:
# $curl -i -H "Content-Type: application/json" -X POST -d '{"id":10, "name":"Teste2", "childrenIds": []}' http://localhost:5000/categories


@app.route("/")
def hello():
    return jsonify(message='Welcome to the technical test')

@app.route("/categories", methods=['POST', 'GET'])
def getCategories():
	#print(request.method)
	if request.method == 'GET':
		# Read JSON file
		with open('data.json') as data_file:
    			data = json.load(data_file)

		return jsonify(data)
	if request.method == 'POST':
		# Read JSON file
		with open('data.json') as data_file:
    			data = json.load(data_file)

		request_data = request.get_json()
		categoryIds = request_data['childrenIds']

		for cat in data:
			if cat['id'] == request_data['id']:
				return jsonify(ok='false', error='Category already exists')


		# for each child Id, scans categories for it. If one is not located, returns an error message
		for id in categoryIds:
			#print(id)
			idsExist = False
			for cat in data:
				if cat['id'] == id:
					idsExist = True
					break
			if idsExist == False:
					return jsonify(ok='false',error='InvalidCategories')

		#partition = data[0:len(data)-1]
		#data = partition + ", " + (str(request_data)) + "]"

		# if submission is accepted
		data.append(request_data)

		with open('data.json', 'wb') as outfile:
    			json.dump(data, outfile)

		return jsonify(ok='true')#json.dumps(data)

@app.route("/categories:<int:param>")
def getCategoryById(param):
	# Read JSON file
	with open('data.json') as data_file:
    		data = json.load(data_file)

	for cat in data:
		#print(cat)
		if cat['id'] == param:
			return jsonify(cat)#json.dumps(cat)

	return jsonify(ok='false', error='InvalidId')

def categories():
	dados = [
	{
		'id' : 1,
		'name' : 'Moda',
		'categoryIds' : [3, 4]
	},
	{
		'id' : 2,
		'name' : 'Informatica',
		'categoryIds' : [5, 6]
	},
	{
		'id' : 3,
		'name' : 'Feminino',
		'categoryIds' : [7]
	},
	{
		'id' : 4,
		'name' : 'Masculino',
		'categoryIds' : [8]
	},
	{
		'id' : 5,
		'name' : 'Notebooks',
		'categoryIds' : []
	},
	{
		'id' : 6,
		'name' : 'Tablets',
		'categoryIds' : []
	},
	{
		'id' : 7,
		'name' : 'Roupas',
		'categoryIds' : []
	},
	{
		'id' : 8,
		'name' : 'Roupas',
		'categoryIds' : []
	}
	]
	return json.dumps(dados)

if __name__ == "__main__":
	app.run()