// JavaScript Document
document.addEventListener('DOMContentLoaded', function() {
            // Variables
            const quizQuestions = document.querySelectorAll('.quiz-question');
            const nextButton = document.getElementById('nextButton');
            const quizResult = document.getElementById('quizResult');
            const skinTypeElement = document.getElementById('skinType');
            const skinDescriptionElement = document.getElementById('skinDescription');
            const recommendedProductsElement = document.getElementById('recommendedProducts');
            
            let currentQuestion = 0;
            let skinTypeScores = {
                dry: 0,
                oily: 0,
                combination: 0,
                normal: 0
            };
            
            // Información de tipos de piel
            const skinTypeInfo = {
                dry: {
                    name: "Piel Seca",
                    description: "Tu piel tiende a sentirse tirante y puede descamarse. Necesita hidratación extra y productos que fortalezcan la barrera cutánea.",
                    products: [
                        "Limpiador cremoso sin sulfatos",
                        "Sérum de ácido hialurónico",
                        "Crema hidratante rica en ceramidas",
                        "Aceite facial para la noche"
                    ]
                },
                oily: {
                    name: "Piel Grasa",
                    description: "Tu piel produce exceso de sebo, lo que puede llevar a brillo, poros dilatados y tendencia a imperfecciones.",
                    products: [
                        "Gel limpiador purificante",
                        "Tónico con ácido salicílico",
                        "Sérum de niacinamida",
                        "Hidratante oil-free en gel"
                    ]
                },
                combination: {
                    name: "Piel Mixta",
                    description: "Tienes áreas grasas (principalmente en la zona T: frente, nariz y mentón) y áreas normales o secas (mejillas).",
                    products: [
                        "Limpiador suave balanceado",
                        "Tónico equilibrante",
                        "Sérum de niacinamida",
                        "Hidratante ligero para toda la cara y crema más rica para zonas secas"
                    ]
                },
                normal: {
                    name: "Piel Normal",
                    description: "¡Felicidades! Tu piel está bien equilibrada, ni muy seca ni muy grasa. Tienes poros finos y pocas imperfecciones.",
                    products: [
                        "Limpiador suave",
                        "Sérum antioxidante",
                        "Hidratante ligero",
                        "Protector solar fluido"
                    ]
                }
            };
            
            // Selección de opciones del quiz
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    // Eliminar selección previa en este grupo
                    const parentQuestion = this.closest('.quiz-question');
                    parentQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Añadir selección actual
                    this.classList.add('selected');
                });
            });
            
            // Botón Siguiente
            nextButton.addEventListener('click', function() {
                const currentQuestionEl = quizQuestions[currentQuestion];
                const selectedOption = currentQuestionEl.querySelector('.quiz-option.selected');
                
                if (selectedOption) {
                    // Sumar punto al tipo de piel seleccionado
                    const skinValue = selectedOption.getAttribute('data-value');
                    skinTypeScores[skinValue]++;
                    
                    // Ocultar pregunta actual
                    currentQuestionEl.style.display = 'none';
                    
                    // Pasar a siguiente pregunta o mostrar resultado
                    currentQuestion++;
                    
                    if (currentQuestion < quizQuestions.length) {
                        // Mostrar siguiente pregunta
                        quizQuestions[currentQuestion].style.display = 'block';
                    } else {
                        // Calcular resultado
                        let maxScore = 0;
                        let resultType = 'normal';
                        
                        for (const type in skinTypeScores) {
                            if (skinTypeScores[type] > maxScore) {
                                maxScore = skinTypeScores[type];
                                resultType = type;
                            }
                        }
                        
                        // Mostrar resultado
                        skinTypeElement.textContent = skinTypeInfo[resultType].name;
                        skinDescriptionElement.textContent = skinTypeInfo[resultType].description;
                        
                        // Crear lista de productos recomendados
                        recommendedProductsElement.innerHTML = '';
                        skinTypeInfo[resultType].products.forEach(product => {
                            const li = document.createElement('li');
                            li.textContent = product;
                            recommendedProductsElement.appendChild(li);
                        });
                        
                        // Cambiar texto del botón
                        nextButton.textContent = 'Realizar test de nuevo';
                        nextButton.addEventListener('click', resetQuiz);
                        quizResult.style.display = 'block';
                    }
                } else {
                    alert('Por favor, selecciona una opción para continuar.');
                }
            });
            
            // Función para reiniciar el quiz
            function resetQuiz() {
                // Ocultar resultados
                quizResult.style.display = 'none';
                
                // Reiniciar puntuaciones
                for (const type in skinTypeScores) {
                    skinTypeScores[type] = 0;
                }
                
                // Ocultar todas las preguntas excepto la primera
                quizQuestions.forEach((question, index) => {
                    if (index === 0) {
                        question.style.display = 'block';
                    } else {
                        question.style.display = 'none';
                    }
                });
                
                // Desmarcar todas las opciones
                document.querySelectorAll('.quiz-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                // Reiniciar contador de preguntas
                currentQuestion = 0;
                
                // Restaurar texto del botón
                nextButton.textContent = 'Siguiente';
                
                // Eliminar el event listener de reinicio
                nextButton.removeEventListener('click', resetQuiz);
            }
            
            // Navegación suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
            
            // Animación de scroll para productos
            const productCards = document.querySelectorAll('.product-card');
            
            window.addEventListener('scroll', function() {
                productCards.forEach(card => {
                    const cardPosition = card.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (cardPosition < screenPosition) {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }
                });
            });
        });