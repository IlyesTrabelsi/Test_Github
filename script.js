document.addEventListener("DOMContentLoaded", () => {

    const chartScript = document.createElement("script");
    chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
    document.head.appendChild(chartScript);
    chartScript.onload = () => {
        const chois = document.querySelectorAll(".poll-area");
        chois.forEach(poll => {

            const options = poll.querySelectorAll("label");
            let pours = [];
            for (let opt of options) {
                const txt = opt.querySelector(".percent").textContent;
                const val = parseFloat(txt.replace("%", ""));
                pours.push(val);
            }
            let der_chois = -1;
            let isSub = false;
            const showUpdatedResults = () => {
                for (let i = 0; i < options.length; i++) {
                    const pText = options[i].querySelector(".percent");
                    const bar = options[i].querySelector(".progress");
                    let v = Math.round(pours[i]);
                    pText.textContent = v + "%";
                    bar.style.setProperty("--w", v);
                    if (i === der_chois) {
                        options[i].classList.add("selected");
                    } else {
                        options[i].classList.remove("selected");
                    }
                }

                if (poll.voteChart) {
                    poll.voteChart.data.datasets[0].data = pours;
                    poll.voteChart.update();
                }
            };

            options.forEach((opt, index) => {
                opt.addEventListener("click", () => {

                    if (isSub) return;
                    if (der_chois === index) return;

                    pours[index] += 5;

                    if (der_chois !== -1) {
                        pours[der_chois] -= 5;
                        if (pours[der_chois] < 0) pours[der_chois] = 0;
                    } else {
                        for (let i = 0; i < pours.length; i++) {
                            if (i !== index) {
                                pours[i] -= 2;
                                if (pours[i] < 0) pours[i] = 0;
                            }
                        }
                    }

                    let sum = pours.reduce((a, b) => a + b, 0);
                    if (sum !== 100) {
                        pours[index] += 100 - sum;
                    }

                    der_chois = index;
                    showUpdatedResults();
                });
            });
            showUpdatedResults();
            const submitBtn = document.createElement("button");
            submitBtn.textContent = "Submit Vote";
            submitBtn.style.marginTop = "10px";
            submitBtn.style.padding = "8px 12px";
            submitBtn.style.backgroundColor = "#4caf50";
            submitBtn.style.color = "white";
            submitBtn.style.border = "none";
            submitBtn.style.borderRadius = "6px";
            submitBtn.style.cursor = "pointer";
            submitBtn.style.fontSize = "15px";

            poll.insertAdjacentElement("afterend", submitBtn);
