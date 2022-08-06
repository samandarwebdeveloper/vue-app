<script setup>
import { ref, computed } from 'vue'

let questions = ref([
  {
      question: 'What is Vue?',
      type: 'test',
      answer: 0,
      options: [
        'A framework',
        'A library',
        'A type of hat'
      ],
      selected: null
  },
  {
      question: 'What is Vuex used for?',
      type: 'test',
      answer: 2,
      options: [
        'Serializing data',
        'Viewing things',
        'State management'
      ],
      selected: null
  },
  {
	    question: 'What is Vue Router?',
      type: 'test',
	    answer: 1,
	    options: [
	    	'A framework',
	    	'A routing library for Vue',
	    	'A type of hat'
	    ],
	    selected: null
  },
  {
      question: 'What is React?',
      type: 'test',
      answer: 1, 
      options: [
          'A framework',
          'A library',
          'A type of hat'
      ],
      selected: null
  },
  {
    question: 'What is React Router?',
    type: 'test',
    answer: 1,
    options: [
        'A framework',
        'A routing library for React',
        'A type of hat'
    ],
    selected: null
  },
  {
    question: 'Webpack is a...',
    type: 'quiz',
    answer: 'library',
    selected: null
  },
  {
    question: 'What is Babel?',
    type: 'quiz',
    answer: 'compiler',
    selected: null
  },
  {
    question: 'Choose Front-end frameworks',
    type: 'multiple',
    answer: [
        0,
        1
    ],
    options: [
        'Angular',
        'Vue',
        'Express',
    ],
    multipleSelected: [],
    selected: null
  },
  {
    question: 'Choose Back-end frameworks',
    type: 'multiple',
    answer: [
        0,
        1
    ],
    options: [
        'NestJS',
        'Express',
        'React',
    ],
    multipleSelected: [],
    selected: null
  },
  {
    question: 'Choose NoSQL databases',
    type: 'multiple',
    answer: [
        0,
        1
    ],
    options: [
        'MongoDB',
        'Cassandra',
        'PostgreSQL',
    ],
    multipleSelected: [],
    selected: null
  }
])

const quizCompleted = ref(false)
const currentQuestion = ref(0)
const modalOpen = ref(false)
const addModalOpen = ref(false)
const newQuestionType = ref('test')

const score = computed(() => {
	let value = 0
  let multepleChecked = 0
	questions.value.map(q => {
    if (q.type === 'test') {
      if (q.selected != null && q.answer == q.selected) {
			  value++
		  }
    } else if (q.type === 'quiz') {
      if (q.selected === q.answer) {
        value++
      }
    } else if (q.type === 'multiple') {
      multepleChecked = 0
      if (q.selected !== null && q.multipleSelected?.length === q.answer.length) {
        q.answer.map(a => {
          if (q.multipleSelected.includes(a)) {
            multepleChecked++
          }
        })
        if (multepleChecked === q.answer.length) {
          value++
        }
      }
    } 
		
	})
	return value
})
const getCurrentQuestion = computed(() => {
  return questions.value[currentQuestion.value]
})
const SetAnswer = (e) => {
	let question = questions.value[currentQuestion.value]
  if (question.type === 'test') {
    question.selected = e.target.value
  } else if (question.type === 'quiz') {
    question.selected = e.target.value
  } else if (question.type === 'multiple') {
    if (question.selected === null) {
      question.answer.includes(e.target.value) 
      ? question.multipleSelected.push(e.target.value) && multepleChecked++
      : null
      question.multipleSelected.length === question.answer.length ? question.selected = question.multipleSelected : null
    } else {
      question.multipleSelected.includes(e.target.value) 
      ? question.multipleSelected.splice(question.multipleSelected.indexOf(e.target.value), 1) && multipleChecked--
      : question.multipleSelected.push(e.target.value) && multipleChecked++
      question.selected = question.multipleSelected
    }
  }
}
const NextQuestion = () => {
	if (currentQuestion.value < questions.value.length - 1) {
		currentQuestion.value++
		return
	}
	quizCompleted.value = true
}

const ResetQuiz = () => {
  quizCompleted.value = false
  currentQuestion.value = 0
  questions.value.map(q => {
    q.selected = null
    q.multipleSelected = []
  })
}

const newQuestion = computed(() => {
  return {
    question: '',
    type: 'test',
    answer: '',
    options: [],
    selected: null
  }
})

const AddQuestion = () => {
  if (newQuestion.value.question !== '' && newQuestion.value.answer !== '') {
  if (newQuestion.value.type === 'test') {
    questions.value.push({
    question: newQuestion.value.question,
    type: newQuestion.value.type,
    answer: newQuestion.value.answer.split(''),
    options: newQuestion.value.options.split(','),
    selected: null
  })
  } else if (newQuestion.value.type === 'quiz') {
    questions.value.push({
    question: newQuestion.value.question,
    type: newQuestion.value.type,
    answer: newQuestion.value.answer,
    selected: null
  })
  } else if (newQuestion.value.type === 'multiple') {
    questions.value.push({
    question: newQuestion.value.question,
    type: newQuestion.value.type,
    answer: newQuestion.value.answer.split(','),
    options: newQuestion.value.options.split(','),
    multipleSelected: [],
    selected: null
  })
  }
    modalOpen.value = false
  }
}

const AddModalOpen = () => {
  modalOpen.value = true
  addModalOpen.value = true
}

</script>

<template>
	<main class="quiz-template">
		<h1>The Quiz</h1>
		<button class="add-question-open" @click="AddModalOpen">Add Question</button>
    <div class="modal" v-if="modalOpen">
      <div class="modal-content" v-if="addModalOpen">
        <div class="modal-header">
          <h3>Add Question</h3>
        </div>
        <div class="modal-body">
          <div class="question-form">
            
            <div class="question-form-input">
              <label for="question">Question</label>
              <input type="text" id="question" v-model="newQuestion.question" placeholder="Enter question here">
            </div>
            <div class="question-form-input">
              <label for="type">Type</label>
              <select id="type" v-model="newQuestion.type" @change="newQuestionType = $event.target.value">
                <option value="test">Test</option>
                <option value="quiz">Quiz</option>
                <option value="multiple">Multiple</option>
              </select>
            </div>
            <div class="question-form-input">
              <label for="answer">Answer</label>
              <input type="text" id="answer" v-model="newQuestion.answer" :placeholder="`Enter the answer${newQuestionType === 'test' ? 'in 0 or 1 option index format' : ''} ${newQuestionType === 'multiple' ? 'in 0,1 or 1,2 options index format' : ' '}`">
            </div>
            <div class="question-form-input" v-if="newQuestionType !== 'quiz'">
              <label for="options">Options</label>
              <input type="text" id="options" v-model="newQuestion.options" placeholder="Enter options here separated by commas: option1,option2">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="add-question" @click="AddQuestion">Add Question</button>
          <button class="close" @click="modalOpen = false">Close</button>
        </div>
      </div>
    </div>
		<section class="quiz" v-if="!quizCompleted">
			<div class="quiz-info">
				<span class="question">{{ getCurrentQuestion.question }}</span>
				<span class="score">Score {{ score }}/{{ questions.length }}</span>
			</div>
			
			<div class="options">
				<label 
					v-for="(option, index) in getCurrentQuestion.options" 
					:for="'option' + index" 
					:class="`option ${
						getCurrentQuestion.selected == index 
							? index == getCurrentQuestion.answer 
								? 'correct' 
								: 'wrong'
							: ''
					} ${
						getCurrentQuestion.selected != null &&
						index != getCurrentQuestion.selected
							? 'disabled'
							: ''
					}`" v-if="getCurrentQuestion.type === 'test'">
					<input 
						type="radio"
						:id="'option' + index" 
						:name="getCurrentQuestion.index" 
						:value="index" 
						v-model="getCurrentQuestion.selected" 
						:disabled="getCurrentQuestion.selected"
						@change="SetAnswer" />
					<span>{{ option }}</span>
				</label>
        <label 
          v-for="(option, index) in getCurrentQuestion.options" 
          :for="'option' + index" 
          :class="`option ${
            getCurrentQuestion.multipleSelected.includes(index) 
              ? getCurrentQuestion.answer.includes(index) 
                ? 'correct' 
                : 'wrong'
              : ''
          } 
          ${
            getCurrentQuestion.selected != null &&
            !getCurrentQuestion.multipleSelected.includes(index)
              ? 'disabled'
              : ''
          }`" v-if="getCurrentQuestion.type === 'multiple'">
          <input 
            type="checkbox"
            :id="'option' + index" 
            :name="getCurrentQuestion.index" 
            :value="index" 
            v-model="getCurrentQuestion.multipleSelected"
            :disabled="getCurrentQuestion.multipleSelected.length === getCurrentQuestion.answer.length"
            @change="SetAnswer" />
          <span>{{ option }}</span>
        </label>
        <label v-if="getCurrentQuestion.type === 'quiz'">
          <input 
            type="text" 
            class="text-input"
            placeholder="Type your answer here"
            v-model="getCurrentQuestion.selected" 
            @change="SetAnswer" />
        </label>
			</div>
			<button class="quiz-btn"
				@click="NextQuestion" 
				:disabled="!getCurrentQuestion.selected">
				{{ 
					getCurrentQuestion.index == questions.length - 1 
						? 'Finish' 
						: getCurrentQuestion.selected == null
							? 'Select an option'
							: 'Next question'
				}}
			</button>
		</section>

		<section class="finish-template" v-else>
			<h2>You have finished the quiz!</h2>
			<p>Your score is {{ score }}/{{ questions.length }}</p>
      <button class="quiz-btn" @click="ResetQuiz">Try again</button>
		</section>
	</main>
</template>

<style>

.quiz-template {
  display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
}
h1 {
	font-size: 2rem;
	margin-bottom: 2rem;
}

.add-question-open {
  position: absolute;
  right: 50px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background: #424242;
  padding: 1rem;
  border-radius: 5px;
}

.modal-header h3 {
  margin: 0;
}

.modal-body {
  padding: 1rem 0;
}

.question-form-input label {
  margin-bottom: 0.5rem;
}

.question-form-input input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #424242;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}
.question-form-input select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #424242;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.quiz {
	background-color: #25423d;
	padding: 1rem;
	width: 100%;
	max-width: 840px;
  border-radius: 10px;
}
.text-input {
  width: 100%;
  padding: .5rem;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: #fff;
  color: #25423d;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.quiz-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}
.quiz-info .question {
	color: #bebebe;
	font-size: 1.25rem;
}
.quiz-info .score {
	color: #ececec;
	font-size: 1rem;
}
.options {
	margin-bottom: 1rem;
}
.option {
	padding: 1rem;
	display: block;
	background-color: #271c36;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
}
.option:hover {
	background-color: #2d213f;
}
.option.correct {
	background-color: #2cce7d;
}
.option.wrong {
	background-color: #ff5a5f;
}
.option:last-of-type {
	margin-bottom: 0;
}
.option.disabled {
	opacity: 0.5;
}
.option input {
	display: none;
}
button.quiz-btn {
	appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: #2cce7d;
	color: #2d213f;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 1rem;
	border-radius: 0.5rem;
  margin-top: 10px;
}
button.quiz-btn:disabled {
	opacity: 0.5;
  cursor: not-allowed;
}

h2 {
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
}
p {
	color: #8F8F8F;
	font-size: 1.5rem;
	text-align: center;
}

.finish-template {
  text-align: center;
}
</style>