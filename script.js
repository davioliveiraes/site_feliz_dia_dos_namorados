// Variável global para controlar o slide atual
let currentSlide = 1;

// Criar corações flutuantes
function createHearts() {
   const heartsContainer = document.getElementById('hearts');
   const heartSymbols = ['❤️', '💕', '💖', '💗', '🌹'];
   
   setInterval(() => {
       const heart = document.createElement('div');
       heart.className = 'heart';
       heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
       heart.style.left = Math.random() * 100 + '%';
       heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
       heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
       
       heartsContainer.appendChild(heart);
       
       // Remove o coração após a animação
       setTimeout(() => {
           if (heart.parentNode) {
               heart.remove();
           }
       }, 7000);
   }, 800);
}

// Scroll suave para seções
function scrollToSection(sectionId) {
   const section = document.getElementById(sectionId);
   if (section) {
       section.scrollIntoView({
           behavior: 'smooth'
       });
   }
}

// Animação de scroll para timeline
function handleScrollAnimations() {
   const timelineItems = document.querySelectorAll('.timeline-item');
   
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('animate');
           }
       });
   }, { 
       threshold: 0.2,
       rootMargin: '0px 0px -50px 0px'
   });

   timelineItems.forEach(item => {
       observer.observe(item);
   });
}

// Função para mostrar o ano específico na galeria
function showYear(year) {
   // Remove a classe active de todos os slides e botões
   const allSlides = document.querySelectorAll('.gallery-slide');
   const allButtons = document.querySelectorAll('.year-btn');
   
   allSlides.forEach(slide => {
       slide.classList.remove('active');
   });
   
   allButtons.forEach(btn => {
       btn.classList.remove('active');
   });
   
   // Ativa o slide e botão correspondente
   const targetSlide = document.getElementById(`year-${year}`);
   const targetButton = document.querySelector(`[onclick="showYear(${year})"]`);
   
   if (targetSlide) {
       targetSlide.classList.add('active');
   }
   
   if (targetButton) {
       targetButton.classList.add('active');
   }
   
   // Atualiza a variável global
   currentSlide = year;
}

// CORREÇÃO: Funções de navegação da galeria com nomes corretos
function previousYear() {
   const newSlide = currentSlide <= 1 ? 5 : currentSlide - 1;
   showYear(newSlide);
}

function nextYear() {
   const newSlide = currentSlide >= 5 ? 1 : currentSlide + 1;
   showYear(newSlide);
}

// Quiz interativo - EXPANDIDO PARA 10 PERGUNTAS
let quizScore = 0;
let currentQuestion = 0;
const questions = [
   {
       question: "Qual é a minha série favorita?",
       options: ["Strangs Things", "Game of Thrones", "Suits", "Prison Break"],
       correct: 2
   },
   {
       question: "Qual é minha comida favorita?",
       options: ["Pizza", "Lasanha", "Hambúrguer", "Sushi"],
       correct: 0
   },
   {
       question: "Qual é o jogo que mais gosto de jogar?",
       options: ["Valorant", "Fifa 25", "Counter Strike", "League Of Legends"],
       correct: 3
   },
   {
       question: "Qual é a cor da minha camisa favorita no momento?",
       options: ["Preto básico", "Azul pétroleo", "Branco Off White", "Cinza chumbo"],
       correct: 1
   },
   {
       question: "Qual é o grupo múscular que mais gosto de treinar?",
       options: ["Peito", "Costa", "Braço", "Perna"],
       correct: 0
   },
   {
       question: "Qual é o nome do osso que quebrei?",
       options: ["Fíbula", "Tíbia", "Patela", "Fêmur"],
       correct: 1
   },
   {
       question: "Qual é o nome do livro que estou lendo atualmente?",
       options: ["Essencialismo", "UltraAprendizado", "Código Limpo", "Hábitos Atômicos"],
       correct: 1
   },
   {
       question: "Qual é o meu gênero de filme que prefiro assistir?",
       options: ["Ação e aventura", "Comédia romântica", "Terror", "Ficção Ciêntífica"],
       correct: 0
   },
   {
       question: "Nome da faculdade que estou me formando?",
       options: ["Ciência da Computação", "Sistemas de Informação", "Engenharia de Produção", "Engenharia de Software"],
       correct: 3
   },
   {
       question: "Quem é o amor da minha vida?",
       options: ["Márcia Roberta Freitas Cavalcante", "Fulana", "Sincrana", "Beltrana"],
       correct: 0
   }
];

function loadQuestion() {
   const questionElement = document.getElementById('quiz-question');
   const optionsContainer = document.querySelector('.quiz-options');
   const resultElement = document.getElementById('quiz-result');
   
   if (!questionElement || !optionsContainer) return;
   
   if (currentQuestion < questions.length) {
       const question = questions[currentQuestion];
       questionElement.textContent = `Pergunta ${currentQuestion + 1}/10: ${question.question}`;
       
       // Limpa as opções anteriores
       optionsContainer.innerHTML = '';
       
       // Adiciona as novas opções
       question.options.forEach((option, index) => {
           const optionDiv = document.createElement('div');
           optionDiv.className = 'quiz-option';
           optionDiv.textContent = option;
           optionDiv.onclick = () => checkAnswer(optionDiv, index === question.correct);
           optionsContainer.appendChild(optionDiv);
       });
       
       // Limpa o resultado anterior
       if (resultElement) {
           resultElement.innerHTML = '';
       }
   } else {
       // Quiz finalizado
       showQuizResults();
   }
}

function checkAnswer(element, isCorrect) {
   const options = document.querySelectorAll('.quiz-option');
   const result = document.getElementById('quiz-result');
   
   if (!result) return;
   
   // Desabilita todas as opções
   options.forEach(opt => {
       opt.style.pointerEvents = 'none';
       opt.style.opacity = '0.6';
   });
   
   // Destaca a resposta selecionada
   element.style.opacity = '1';
   
   if (isCorrect) {
       element.style.background = 'rgba(0, 255, 0, 0.3)';
       element.style.borderColor = '#00ff00';
       result.innerHTML = '✅ Correto! Você me conhece bem! 💕';
       result.style.color = '#00ff00';
       quizScore++;
   } else {
       element.style.background = 'rgba(255, 0, 0, 0.3)';
       element.style.borderColor = '#ff0000';
       result.innerHTML = '❌ Ops! Mas tudo bem, ainda te amo! 😘';
       result.style.color = '#ff6b6b';
   }
   
   // Avança para a próxima pergunta
   setTimeout(() => {
       currentQuestion++;
       loadQuestion();
   }, 2000);
}

function showQuizResults() {
   const questionElement = document.getElementById('quiz-question');
   const optionsContainer = document.querySelector('.quiz-options');
   const resultElement = document.getElementById('quiz-result');
   
   if (!questionElement || !optionsContainer || !resultElement) return;
   
   questionElement.textContent = 'Quiz Finalizado! 💖';
   optionsContainer.innerHTML = '';
   
   const percentage = Math.round((quizScore / questions.length) * 100);
   let message = '';
   
   if (percentage >= 90) {
       message = `🌟 PERFEITO! Você acertou ${quizScore} de ${questions.length} perguntas! Você me conhece melhor que eu mesmo! 💕`;
   } else if (percentage >= 80) {
       message = `🎉 Fantástico! Você acertou ${quizScore} de ${questions.length} perguntas! Somos uma dupla perfeita! 💗`;
   } else if (percentage >= 70) {
       message = `😊 Muito bom! Você acertou ${quizScore} de ${questions.length} perguntas! Estamos no caminho certo! 💖`;
   } else if (percentage >= 60) {
       message = `💕 Legal! Você acertou ${quizScore} de ${questions.length} perguntas! Ainda temos muito para descobrir juntos! ❤️`;
   } else {
       message = `😘 Você acertou ${quizScore} de ${questions.length} perguntas! Temos toda uma vida para nos conhecermos melhor! 💝`;
   }
   
   resultElement.innerHTML = message;
   resultElement.style.color = '#ffffff';
   resultElement.style.fontSize = '1.3rem';
   
   // Adiciona botão para reiniciar o quiz
   const restartBtn = document.createElement('button');
   restartBtn.textContent = 'Jogar Novamente 🔄';
   restartBtn.className = 'quiz-option';
   restartBtn.style.marginTop = '2rem';
   restartBtn.style.background = 'rgba(255, 107, 107, 0.8)';
   restartBtn.style.color = 'white';
   restartBtn.style.fontWeight = 'bold';
   restartBtn.onclick = restartQuiz;
   
   optionsContainer.appendChild(restartBtn);
}

function restartQuiz() {
   quizScore = 0;
   currentQuestion = 0;
   loadQuestion();
}

// Função para detectar quando elementos entram na tela
function observeElements() {
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.style.opacity = '1';
               entry.target.style.transform = 'translateY(0)';
           }
       });
   }, {
       threshold: 0.1,
       rootMargin: '0px 0px -20px 0px'
   });

   // Observa todos os elementos que devem ter animação de entrada
   const elementsToAnimate = document.querySelectorAll('.photo-item, .carta-container, .quiz-container');
   elementsToAnimate.forEach(el => {
       el.style.opacity = '0';
       el.style.transform = 'translateY(30px)';
       el.style.transition = 'all 0.6s ease';
       observer.observe(el);
   });
}

// Auto-play da galeria (opcional)
let autoPlayInterval;
function startGalleryAutoPlay() {
   autoPlayInterval = setInterval(() => {
       nextYear();
   }, 8000); // Muda de slide a cada 8 segundos
}

// Função para pausar auto-play quando o usuário interage
function pauseAutoPlay() {
   clearInterval(autoPlayInterval);
}

// Navegação por teclado para a galeria
function handleKeyboardNavigation(event) {
   if (event.key === 'ArrowLeft') {
       previousYear();
   } else if (event.key === 'ArrowRight') {
       nextYear();
   } else if (event.key >= '1' && event.key <= '5') {
       const year = parseInt(event.key);
       showYear(year);
   }
}

// Inicializar quando a página carregar
window.addEventListener('load', () => {
   // Inicializa as animações de corações
   createHearts();
   
   // Configura as animações de scroll
   handleScrollAnimations();
   
   // Observa elementos para animação
   observeElements();
   
   // Carrega a primeira pergunta do quiz
   loadQuestion();
   
   // Inicializa a galeria no primeiro ano
   showYear(1);
   
   // Opcional: Inicia o auto-play da galeria
   // startGalleryAutoPlay();
   
   // Adiciona navegação por teclado
   document.addEventListener('keydown', handleKeyboardNavigation);
   
   // Observar quando a seção da carta entra na tela para ativar o typewriter
   const cartaSection = document.getElementById('carta');
   if (cartaSection) {
       const cartaObserver = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   typewriterEffect();
                   cartaObserver.unobserve(entry.target);
               }
           });
       }, { 
           threshold: 0.5 
       });
       
       cartaObserver.observe(cartaSection);
   }
});

// Adiciona smooth scroll para todos os navegadores
document.addEventListener('DOMContentLoaded', () => {
   // Polyfill para smooth scroll em navegadores mais antigos
   if (!('scrollBehavior' in document.documentElement.style)) {
       const script = document.createElement('script');
       script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js';
       document.head.appendChild(script);
   }
});

// Função para redimensionar elementos em telas pequenas
function handleResize() {
   const hero = document.querySelector('.hero h1');
   if (hero && window.innerWidth < 480) {
       hero.style.fontSize = '2rem';
   } else if (hero && window.innerWidth < 768) {
       hero.style.fontSize = '2.5rem';
   } else if (hero) {
       hero.style.fontSize = '4rem';
   }
}

// Escuta mudanças no tamanho da tela
window.addEventListener('resize', handleResize);

// Executa na carga inicial
handleResize();

// Função para adicionar efeitos de hover personalizados
function addInteractiveEffects() {
   // Efeito de hover para os itens da timeline
   const timelineItems = document.querySelectorAll('.timeline-item');
   timelineItems.forEach(item => {
       item.addEventListener('mouseenter', () => {
           item.style.transform = 'translateX(0) scale(1.02)';
       });
       
       item.addEventListener('mouseleave', () => {
           item.style.transform = 'translateX(0) scale(1)';
       });
   });
   
   // Efeito de parallax suave para os corações
   window.addEventListener('scroll', () => {
       const scrolled = window.pageYOffset;
       const hearts = document.querySelectorAll('.heart');
       hearts.forEach((heart, index) => {
           const speed = 0.5 + (index % 3) * 0.2;
           heart.style.transform += ` translateY(${scrolled * speed}px)`;
       });
   });
}

// Função para adicionar gestos de swipe em dispositivos móveis
function addSwipeGestures() {
   let startX = null;
   let startY = null;
   
   const galleryContainer = document.querySelector('.gallery-container');
   
   if (!galleryContainer) return;
   
   galleryContainer.addEventListener('touchstart', (e) => {
       startX = e.touches[0].clientX;
       startY = e.touches[0].clientY;
   });
   
   galleryContainer.addEventListener('touchmove', (e) => {
       e.preventDefault(); // Previne o scroll durante o swipe
   });
   
   galleryContainer.addEventListener('touchend', (e) => {
       if (!startX || !startY) return;
       
       const endX = e.changedTouches[0].clientX;
       const endY = e.changedTouches[0].clientY;
       
       const diffX = startX - endX;
       const diffY = startY - endY;
       
       // Verifica se é um swipe horizontal (mais horizontal que vertical)
       if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
           if (diffX > 0) {
               // Swipe para a esquerda - próximo slide
               nextYear();
           } else {
               // Swipe para a direita - slide anterior
               previousYear();
           }
       }
       
       startX = null;
       startY = null;
   });
}

// Inicializa efeitos adicionais
document.addEventListener('DOMContentLoaded', () => {
   addInteractiveEffects();
   addSwipeGestures();
});

// Função para melhorar a acessibilidade
function improveAccessibility() {
   // Adiciona atributos ARIA para melhor acessibilidade
   const yearButtons = document.querySelectorAll('.year-btn');
   yearButtons.forEach((btn, index) => {
       btn.setAttribute('aria-label', `Ver fotos do ${index + 1}º ano`);
       btn.setAttribute('role', 'tab');
   });
   
   const navButtons = document.querySelectorAll('.nav-btn');
   navButtons[0]?.setAttribute('aria-label', 'Slide anterior');
   navButtons[1]?.setAttribute('aria-label', 'Próximo slide');
   
   // Adiciona indicadores de foco visíveis
   const focusableElements = document.querySelectorAll('button, .quiz-option');
   focusableElements.forEach(el => {
       el.addEventListener('focus', () => {
           el.style.outline = '3px solid rgba(255, 107, 107, 0.8)';
           el.style.outlineOffset = '2px';
       });
       
       el.addEventListener('blur', () => {
           el.style.outline = 'none';
       });
   });
}

// Chama a função de acessibilidade quando a página carrega
window.addEventListener('load', improveAccessibility);