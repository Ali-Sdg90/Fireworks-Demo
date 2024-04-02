console.log("Aloha");

const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const body = document.querySelector("body") as HTMLElement;

const createSparkle = (
    direction: "NW" | "NE" | "SW" | "SE",
    fireworkPackage: HTMLDivElement,
    min: number,
    max: number
) => {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    fireworkPackage.appendChild(sparkle);

    setTimeout(() => {
        let NPositive = true;
        let WPositive = true;

        switch (direction) {
            case "NW":
                NPositive = true;
                WPositive = true;
                break;
            case "NE":
                NPositive = true;
                WPositive = false;
                break;
            case "SW":
                NPositive = false;
                WPositive = true;
                break;
            case "SE":
                NPositive = false;
                WPositive = false;
                break;
            default:
                break;
        }

        sparkle.style.top = `${NPositive ? "-" : ""}${randomNumber(
            min,
            max
        )}px`;
        sparkle.style.left = `${WPositive ? "-" : ""}${randomNumber(
            min,
            max
        )}px`;
    }, 300);
};

const directions = ["NW", "NE", "SW", "SE"];

const createFirework = (color: string) => {
    const fireworkPackage = document.createElement("div");
    fireworkPackage.classList.add("firework-package");
    fireworkPackage.style.background = color;
    const fireworkPackageLeft = randomNumber(20, 80);
    fireworkPackage.style.left = `${fireworkPackageLeft}%`;

    const firework = document.createElement("div");
    firework.classList.add("firework");

    fireworkPackage.appendChild(firework);
    body.appendChild(fireworkPackage);

    setTimeout(() => {
        fireworkPackage.style.bottom = `${randomNumber(350, 550)}px`;
        fireworkPackage.style.left = `${randomNumber(
            fireworkPackageLeft - 25,
            fireworkPackageLeft + 25
        )}%`;

        setTimeout(() => {
            setTimeout(() => {
                firework.style.opacity = "0";
                fireworkPackage.style.background = "transparent";
            }, 400);

            directions.map((direction) => {
                const maxSpreadRadius = randomNumber(50, 200);

                for (let i = 0; i < 5; i++) {
                    createSparkle(
                        direction as "NW" | "NE" | "SW" | "SE",
                        fireworkPackage,
                        15 + maxSpreadRadius / 10,
                        maxSpreadRadius
                    );
                }
            });

            setTimeout(() => {
                fireworkPackage.remove();
            }, 1500);
        }, 500);
    }, 300);
};

const maxColorValue = 220;
const minColorValue = 30;

for (let i = 0; i < 10000; i++) {
    setTimeout(() => {
        setTimeout(() => {
            switch (Math.floor(Math.random() * 6)) {
                case 0:
                    createFirework(
                        `rgb(${maxColorValue}, ${minColorValue}, ${randomNumber(
                            120,
                            255
                        )})`
                    );
                    break;
                case 1:
                    createFirework(
                        `rgb(${minColorValue}, ${maxColorValue}, ${randomNumber(
                            120,
                            255
                        )})`
                    );
                    break;
                case 2:
                    createFirework(
                        `rgb(${maxColorValue}, ${randomNumber(
                            120,
                            255
                        )}, ${minColorValue})`
                    );
                    break;
                case 3:
                    createFirework(
                        `rgb(${minColorValue}, ${randomNumber(
                            120,
                            255
                        )}, ${maxColorValue})`
                    );
                    break;
                case 4:
                    createFirework(
                        `rgb(${randomNumber(
                            120,
                            255
                        )}, ${maxColorValue}, ${minColorValue})`
                    );
                    break;
                case 5:
                    createFirework(
                        `rgb(${randomNumber(
                            120,
                            255
                        )}, ${minColorValue}, ${maxColorValue})`
                    );
                    break;
            }
        }, i * randomNumber(100, 380));
    }, 1000);
}
