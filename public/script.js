let score = 0;

document.getElementById('tapButton').addEventListener('click', () => {
    score++;
    document.getElementById('score').innerText = score;
});
