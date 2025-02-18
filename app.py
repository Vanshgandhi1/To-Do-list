from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

tasks = []  # In-memory list of tasks (use a database for real projects)

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_data = request.get_json()
    new_task = task_data['task']
    task_id = len(tasks)  # Assign a unique ID
    tasks.append({'id': task_id, 'task': new_task})
    return jsonify({'id': task_id, 'task': new_task})

@app.route('/delete_task', methods=['POST'])
def delete_task():
    task_data = request.get_json()
    task_id = task_data['id']

    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]  # Remove the task

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
