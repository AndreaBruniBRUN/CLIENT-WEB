//const indirizzoIPDelServer = 'ANDBRU-NBT'; // Indirizzo IP o nome del server versione PC
//const eventSource = new EventSource(`http://${indirizzoIPDelServer}:3000/stream-dati.html`);  //versione PC
//const indirizzoIPDelServer = 'https://www.dropbox.com/scl/fi/9ighagpt4fxrwmn9n7p7k/stream-dati.html?rlkey=wf2keoyl5olth6qkyzmusbi51&dl=0';
//const indirizzoIPDelServer = 'https://andreabrunibrun.github.io/Testprova/CLIENT-WEB/stream-dati.html';
//const indirizzoIPDelServer = 'https://andreabrunibrun.github.io/Testprova/CLIENT-WEB';
//const eventSource = new EventSource(`${indirizzoIPDelServer}/stream-dati.html`);
//https://www.dropbox.com/s/XXXXXXXXXXXX/stream-dati.html?dl=0
//const indirizzoIPDelServer = 'https://andreabrunibrun.github.io/CLIENT-WEB';
//client-web-odcm-fchm3x6mr-abrunis-projects.vercel.app

c//onst indirizzoIPDelServer = 'https://client-web-odcm.vercel.app';
//const eventSource = new EventSource(`${indirizzoIPDelServer}/index`);
//const indirizzoIPDelServer = 'http://192.168.1.35:3000';
//const eventSource = new EventSource(`${indirizzoIPDelServer}/index`);

//const indirizzoIPDelServer = 'http://192.168.1.35:3000';
//const eventSource = new EventSource(`${indirizzoIPDelServer}/index.html`);
// ...


//test
//const eventSource = new EventSource(indirizzoIPDelServer);
// ... resto del tuo codice ...

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


