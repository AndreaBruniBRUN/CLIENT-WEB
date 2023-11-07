//const indirizzoIPDelServer = 'ANDBRU-NBT'; // Indirizzo IP o nome del server
//const eventSource = new EventSource(`http://${indirizzoIPDelServer}:3000/stream-dati.html`);


//const eventSource = new EventSource('/stream-dati');

const datiGrafico = [];
const tempoIniziale = moment();
const canvas = document.getElementById('grafico').getContext('2d');

const grafico = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'X',
            data: datiGrafico,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const tempoTrascorso = moment().diff(tempoIniziale);

    datiGrafico.push({
        x: tempoTrascorso,
        y: data.z
    });

    grafico.update();

    document.getElementById('x').value = data.x;
    document.getElementById('y').value = data.y;
    document.getElementById('z').value = data.z;
};

eventSource.onerror = function (error) {
    console.error('Errore nella connessione SSE:', error);
};


