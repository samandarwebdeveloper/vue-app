<script setup>
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators';
import { ref, computed } from 'vue';



const students = ref([
    {
        id: 1,
        name: 'John',
        number: '+998912345675',
        course: 'Web Development'
    },
    {
        id: 2,
        name: 'Jane',
        number: '+998912345658',
        course: 'Web Development'
    },
    {
        id: 3,
        name: 'Jack',
        number: '+998912345569',
        course: 'Web Development'
    },
    {
        id: 4,
        name: 'Jill',
        number: '+998912345570',
        course: 'Web Development'
    },
    {
        id: 5,
        name: 'Joe',
        number: '+998912345571',
        course: 'Mobile Development'
    },
    {
        id: 6,
        name: 'Jenny',
        number: '+998912345572',
        course: 'Mobile Development'
    },
    {
        id: 7,
        name: 'Jules',
        number: '+998912345573',
        course: 'Mobile Development'
    },
    {
        id: 8,
        name: 'Jem',
        number: '+998912345574',
        course: 'Mobile Development'
    },
    {
        id: 9,
        name: 'Jenny',
        number: '+998912345755',
        course: 'Mobile Development'
    },
    {
        id: 10,
        name: 'Jules',
        number: '+998912354576',
        course: 'Mobile Development'
    },
    {
        id: 11,
        name: 'Jem',
        number: '+998912345577',
        course: 'Mobile Development'
    },
    {
        id: 12,
        name: 'Jenny',
        number: '+998912345578',
        course: 'Mobile Development'
    },
    {
        id: 13,
        name: 'Jules',
        number: '+998912354579',
        course: 'Mobile Development'
    },
    {
        id: 14,
        name: 'Jem',
        number: '+998912345580',
        course: 'Mobile Development'
    },
    {
        id: 15,
        name: 'Jenny',
        number: '+998912345851',
        course: 'Network Administration'
    },
    {
        id: 16,
        name: 'Jules',
        number: '+998912345582',
        course: 'Network Administration'
    },
    {
        id: 17,
        name: 'Jem',
        number: '+998912345583',
        course: 'Network Administration'
    },
    {
        id: 18,
        name: 'Jenny',
        number: '+998912345584',
        course: 'Network Administration'
    },
    {
        id: 19,
        name: 'Jules',
        number: '+998912354585',
        course: 'Network Administration'
    },
    {
        id: 20,
        name: 'Jem',
        number: '+998912345586',
        course: 'Network Administration'
    }
])

const search = ref('');
const option = ref('');
const sort = ref('');

const filteredStudents = computed(() => {
    return students.value.filter(student => {
        return student.name.toLowerCase().includes(search.value.toLowerCase())
    })
}
)
const sortedStudents = computed(() => {
    return filteredStudents.value.sort((a, b) => {
        if (sort.value === 'id') {
            return a.id - b.id
        } else {
            return a.name.localeCompare(b.name)
        }
    })
}
)
const filteredSortedStudents = computed(() => {
    return sortedStudents.value.filter(student => {
        return student.course.toLowerCase().includes(option.value.toLowerCase())
    }
    )
}
)

const filteredSortedStudentsCount = computed(() => {
    return filteredSortedStudents.value.length
}
)

const openModal = ref(false);

const setStudent = ref({
    id: null,
    name: '',
    number: '',
    course: ''
})

const rules = computed(() => {
    return {
        name: {
            required
        },
        number: {
            required,
            minLength: minLength(13),
            maxLength: maxLength(13),
        },
        course: {
            required
        }
    }
}
)

const v$ = useVuelidate(rules, setStudent)

const editStudent = (student) => {
    openModal.value = true;
    setStudent.value = student;
}

const deleteStudent = (id) => {
    students.value = students.value.filter(student => {
        return student.id !== id
    })
}

const closeModal = () => {
    openModal.value = false;
    setStudent.value = {
        id: null,
        name: '',
        number: '',
        course: ''
    }
    v$.value.$reset();
}

const saveStudent = async () => {
    const result = await v$.value.$validate();
    if (result) {
        if (setStudent.value.id) {
            students.value = students.value.map(student => {
                if (student.id === setStudent.value.id) {
                    return {
                        ...student,
                        name: setStudent.value.name,
                        number: setStudent.value.number,
                        course: setStudent.value.course
                    }
                } else {
                    return student
                }
            }
            )
        } else {
            students.value.push({
                id: students.value.length + 1,
                name: setStudent.value.name,
                number: setStudent.value.number,
                course: setStudent.value.course
            })
        }
        closeModal();
    }
}

const addStudent = () => {
    openModal.value = true;
    setStudent.value = {
        id: null,
        name: '',
        number: '',
        course: ''
    }
}

</script>
<template>
    <div>
        <div class="students-header">
            <div class="header-title">
                <h2>Students</h2>
                <button class="add-student-btn" @click="addStudent">Add Student</button>
            </div>
            <div class="search-wrap">
                    <input type="text" v-model="search" placeholder="Search by name" />
                    <select v-model="option">
                        <option value="">All</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Network Administration">Network Administration</option>
                    </select>
            </div>
            <div class="students-count">
                    <p>{{ filteredSortedStudentsCount }} results</p>
            </div>
        </div>
        <div class="students-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in filteredSortedStudents" :key="student.id">
                        <td>{{ student.id }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.number }}</td>
                        <td>{{ student.course }}</td>
                        <td>
                            <button @click="editStudent(student)">Edit</button>
                            <button @click="deleteStudent(student.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal" v-if="openModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ setStudent.id === null ? 'Add student' : 'Edit Student' }}</h2>
                </div>
                <div class="modal-body">
                    <div class="form-wrap">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" v-model="setStudent.name" id="name" placeholder="Enter name" />
                            <span v-for="error in v$.name.$errors" class="error-msg" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                        <div class="form-group">
                            <label for="number">Number</label>
                            <input type="text" v-model="setStudent.number" id="number" placeholder="Enter number" />
                            <span v-for="error in v$.number.$errors" class="error-msg" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                        <div class="form-group">
                            <label for="course">Course</label>
                            <select v-model="setStudent.course">
                                <option value="" disabled hidden>Select course</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Network Administration">Network Administration</option>
                            </select>
                            <span v-for="error in v$.course.$errors" class="error-msg" :key="error.$uid">{{ error.$message }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="closeModal">Close</button>
                    <button @click="saveStudent">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.students-header {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #242424;
    padding-top: 20px;
}

.header-title {
    position: relative;
}
.header-title h2 {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

button.add-student-btn {
    position: absolute;
    top: 0;
    right: 0;
} 
.search-wrap {
    width: 100%;
    display: flex;
    
}
.search-wrap input {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.search-wrap select {
    width: 20%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.students-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.students-wrap table {
    width: 100%;
    border-collapse: collapse;
}
.students-wrap table th,
.students-wrap table td {
    padding: 10px;
    border: 1px solid rgb(41, 41, 41);
    display: table-cell;
    text-align: center;
}
.students-wrap table td button {
    margin:  0 5px;
}

.students-wrap table tr:nth-child(even) {
    background-color: #363636;
}
.students-wrap table thead tr {
    background-color: #8b8b8b;
    color: #000;
}
.students-wrap table tbody tr:hover {
    background-color: #232935;
}

.students-count {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

.students-count p {
    color: #fff;
    font-size: 20px;
}
.form-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.form-wrap label {
    margin-bottom: 10px;
}
.form-wrap input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
}

.form-wrap select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
}
.error-msg {
    color: rgb(255, 109, 109);
    font-size: 12px;
}
</style>