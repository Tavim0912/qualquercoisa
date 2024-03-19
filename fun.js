document.addEventListener("DOMContentLoaded", function() {
    const loginContainer = document.getElementById("login-container");
    const gameContainer = document.getElementById("game-container");
    const loginButton = document.getElementById("login-button");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const character = document.getElementById("character");
    const ground = document.getElementById("ground-brown");
    const grass = document.getElementById("grass-green");
    const boundaries = document.querySelectorAll(".boundary");
    const description = document.getElementById("description");

    let characterLeft = 50;
    let characterBottom = 50;
    let isJumping = false;
    let isAuthenticated = false;

    function moveCharacter(direction) {
        if (!isAuthenticated) return;

        if (direction === "right") {
            characterLeft += 5;
        } else if (direction === "left") {
            characterLeft -= 5;
        }
        character.style.left = characterLeft + "px";
        checkCollision();
    }

    function jump() {
        if (!isAuthenticated) return;

        if (!isJumping) {
            isJumping = true;
            let jumpCount = 0;

            function jumpFrame() {
                const gravity = 2;
                if (jumpCount < 30) {
                    characterBottom += 4;
                } else if (jumpCount >= 54) {
                    isJumping = false;
                    characterBottom = 100;
                    character.style.bottom = characterBottom + "px";
                    return;
                } else {
                    if (characterBottom - gravity > 50) {
                        characterBottom -= 5;
                    } else {
                        isJumping = false;
                        characterBottom = 100;
                        character.style.bottom = characterBottom + "px";
                        return;
                    }
                }
                character.style.bottom = characterBottom + "px";
                jumpCount++;
                requestAnimationFrame(jumpFrame);
            }

            jumpFrame();
        }
    }

    function checkCollision() {
        for (let boundary of boundaries) {
            const boundaryRect = boundary.getBoundingClientRect();
            const characterRect = character.getBoundingClientRect();

            if (characterRect.left < boundaryRect.right && 
                characterRect.right > boundaryRect.left && 
                characterRect.top < boundaryRect.bottom && 
                characterRect.bottom > boundaryRect.top) {
                gameOver();
                return;
            }
        }
    }

    function gameOver() {
        alert("Game Over");
        isAuthenticated = false;
        loginContainer.style.display = "block";
        gameContainer.style.display = "none";
        description.style.display = "none";
        setTimeout(() => {
            loginContainer.style.display = "block";
            gameContainer.style.display = "none";
            description.style.display = "block";
        }, 3000);
    }

    document.addEventListener("keydown", function(event) {
        if (!isAuthenticated) return;

        if (event.key === "d") {
            moveCharacter("right");
        } else if (event.key === "a") {
            moveCharacter("left");
        } else if (event.key === " ") {
            jump();
        }
    });

    loginButton.addEventListener("click", function() {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === "Flor" && password === "123") {
            isAuthenticated = true;
            loginContainer.style.display = "none";
            gameContainer.style.display = "block";
            description.style.display = "none";
        } else {
            alert("Usuário ou senha incorretos. Tente novamente.");
        }
    });
});
