
const questions = document.querySelectorAll('.question');
const arrow = document.querySelectorAll('.chevron')

questions.forEach((question) => {
    question.addEventListener('click', (e) => {

        const currentQuestion = question.firstElementChild.nextElementSibling;

        questions.forEach(openedQuestions => {
            if (openedQuestions !== question) {
                openedQuestions.firstElementChild.nextElementSibling.classList.remove('max-h-screen')
                openedQuestions.firstElementChild.nextElementSibling.classList.add('max-h-0')
                openedQuestions.firstElementChild.lastElementChild.classList.remove('-rotate-180')
                openedQuestions.firstElementChild.ariaExpanded = false
            }
        })    
        
        if (currentQuestion.classList.contains('max-h-0')) {
            currentQuestion.classList.remove('max-h-0');
            currentQuestion.classList.add('max-h-screen');
            question.firstElementChild.lastElementChild.classList.add('-rotate-180')
            question.firstElementChild.ariaExpanded = true
        } else {
            currentQuestion.classList.add('max-h-0');
            currentQuestion.classList.remove('max-h-screen');
            question.firstElementChild.lastElementChild.classList.remove('-rotate-180')
            question.firstElementChild.ariaExpanded = false
        }
    })
})


