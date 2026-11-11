// 1. Configuração dos Álbuns e suas respectivas fotos
const albumsData = [
     {
        id: 'ç',
        title: 'Convidados',
        cover: 'fotos/convidados/capa.jpg',
        folder: 'fotos/convidados/',
        photos: [
    'convidados-1.jpg',
    'convidados-2.jpg',
    'convidados-3.jpg',
    'convidados-4.jpg',
    'convidados-5.jpg',
    'convidados-6.jpg',
    'convidados-7.jpg',
    'convidados-8.jpg',
    'convidados-9.jpg',
    'convidados-10.jpg',
    'convidados-11.jpg',
    'convidados-12.jpg',
    'convidados-13.jpg',
    'convidados-14.jpg',
    'convidados-15.jpg',
    'convidados-16.jpg',
    'convidados-17.jpg',
    'convidados-18.jpg',
    'convidados-19.jpg',
    'convidados-20.jpg'

        ]
    }
    ,{
        id: 'casamento',
        title: 'Cerimônia de Casamento',
        cover: 'fotos/casamento/capa.jpg',
        folder: 'fotos/casamento/',
        // Cole os nomes exatos dos arquivos aqui (entre aspas e separados por vírgula)
photos: [
    'casamento-1.jpg',
    'casamento-2.jpg',
    'casamento-3.jpg',
    'casamento-4.jpg',
    'casamento-5.jpg',
    'casamento-6.jpg',
    'casamento-7.jpg',
    'casamento-8.jpg',
    'casamento-9.jpg',
    'casamento-10.jpg',
    'casamento-11.jpg',
    'casamento-12.jpg',
    'casamento-13.jpg',
    'casamento-14.jpg',
    'casamento-15.jpg',
    'casamento-16.jpg',
    'casamento-17.jpg',
    'casamento-18.jpg',
    'casamento-19.jpg',
    'casamento-20.jpg',
    'casamento-21.jpg',
    'casamento-22.jpg',
    'casamento-23.jpg',
    'casamento-24.jpg',
    'casamento-25.jpg',
    'casamento-26.jpg',
    'casamento-27.jpg',
    'casamento-28.jpg',
    'casamento-29.jpg',
    'casamento-30.jpg',
    'casamento-31.jpg',
    'casamento-32.jpg',
    'casamento-33.jpg',
    'casamento-34.jpg',
    'casamento-35.jpg',
    'casamento-36.jpg',
    'casamento-37.jpg',
    'casamento-38.jpg',
    'casamento-39.jpg',
    'casamento-40.jpg',
    'casamento-41.jpg',
    'casamento-42.jpg',
    'casamento-43.jpg',
    'casamento-44.jpg',
    'casamento-45.jpg',
    'casamento-46.jpg',
    'casamento-47.jpg',
    'casamento-48.jpg',
    'casamento-49.jpg',
    'casamento-50.jpg',
    'casamento-51.jpg',
    'casamento-52.jpg',
    'casamento-53.jpg'
]
    },
    {
        id: 'festa',
        title: 'Comemoração',
        cover: 'fotos/festa/capa.jpg',
        folder: 'fotos/festa/',
photos: [
    'festa-1.jpg',
    'festa-2.jpg',
    'festa-3.jpg',
    'festa-4.jpg',
    'festa-5.jpg',
    'festa-6.jpg',
    'festa-7.jpg',
    'festa-8.jpg',
    'festa-9.jpg',
    'festa-10.jpg',
    'festa-11.jpg',
    'festa-12.jpg',
    'festa-13.jpg',
    'festa-14.jpg',
    'festa-15.jpg',
    'festa-16.jpg',
    'festa-17.jpg',
    'festa-18.jpg',
    'festa-19.jpg',
    'festa-20.jpg',
    'festa-21.jpg',
    'festa-22.jpg',
    'festa-23.jpg',
    'festa-24.jpg',
    'festa-25.jpg',
    'festa-26.jpg',
    'festa-27.jpg',
    'festa-28.jpg',
    'festa-29.jpg',
    'festa-30.jpg',
    'festa-31.jpg',
    'festa-32.jpg',
    'festa-33.jpg',
    'festa-34.jpg',
    'festa-35.jpg',
    'festa-36.jpg',
    'festa-37.jpg',
    'festa-38.jpg',
    'festa-39.jpg',
    'festa-40.jpg',
    'festa-41.jpg',
    'festa-42.jpg',
    'festa-43.jpg',
    'festa-44.jpg',
    'festa-45.jpg',
    'festa-46.jpg',
    'festa-47.jpg',
    'festa-48.jpg',
    'festa-49.jpg',
    'festa-50.jpg',
    'festa-51.jpg',
    'festa-52.jpg',
    'festa-53.jpg'
]
    }
];


// Variáveis de controle de estado
let currentPhotoUrl = '';
let currentAlbumPhotosList = [];
let currentFolder = '';
let currentPhotoIndex = 0;

function renderAlbums() {
    const grid = document.getElementById('albumGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    albumsData.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.onclick = () => openGallery(album);
        
        card.innerHTML = `
            <img src="${album.cover}" alt="${album.title}" loading="lazy">
            <h3>${album.title}</h3>
        `;
        
        grid.appendChild(card);
    });
}

function openGallery(album) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('modalTitle');
    const photoGrid = document.getElementById('photoGrid');
    
    // Salva o contexto do álbum atual para a navegação
    currentAlbumPhotosList = album.photos;
    currentFolder = album.folder;
    
    title.textContent = `${album.title} — ${album.photos.length} fotos`;
    photoGrid.innerHTML = ''; 
    
    album.photos.forEach((fileName, index) => {
        const imgUrl = `${album.folder}${fileName}`;
        const imgElement = document.createElement('img');
        
        imgElement.src = imgUrl;
        imgElement.loading = 'lazy';
        
        // Passa o ÍNDICE da foto em vez da URL diretamente
        imgElement.onclick = () => openPhotoViewer(index);
        
        photoGrid.appendChild(imgElement);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Agora recebe o índice numérico da foto na lista
function openPhotoViewer(index) {
    const viewer = document.getElementById('photoViewer');
    const viewerImage = document.getElementById('viewerImage');
    const downloadBtn = document.getElementById('downloadBtn');
    
    currentPhotoIndex = index;
    const fileName = currentAlbumPhotosList[currentPhotoIndex];
    const imgUrl = `${currentFolder}${fileName}`;
    
    currentPhotoUrl = imgUrl;
    viewerImage.src = imgUrl;
    
    downloadBtn.href = imgUrl;
    downloadBtn.download = fileName; 
    
    viewer.style.display = 'flex';
}

// Nova função para navegar entre as fotos
function changePhoto(direction) {
    currentPhotoIndex += direction;
    
    // Se passar da última foto, volta para a primeira (Loop)
    if (currentPhotoIndex >= currentAlbumPhotosList.length) {
        currentPhotoIndex = 0;
    } 
    // Se voltar antes da primeira, vai para a última (Loop)
    else if (currentPhotoIndex < 0) {
        currentPhotoIndex = currentAlbumPhotosList.length - 1;
    }
    
    // Abre a nova foto atualizada
    openPhotoViewer(currentPhotoIndex);
}

function closeViewer() {
    document.getElementById('photoViewer').style.display = 'none';
}

async function sharePhoto() {
    if (navigator.share) {
        try {
            const url = window.location.href;
            await navigator.share({
                title: 'Nossas Fotos',
                text: 'Confira este momento especial!',
                url: url
            });
        } catch (err) {
            console.log('Erro ao compartilhar:', err);
        }
    } else {
        alert('A função de compartilhamento não é suportada neste navegador.');
    }
}

// Suporte a teclado para navegação no computador
document.addEventListener('keydown', (e) => {
    const viewer = document.getElementById('photoViewer');
    if (viewer.style.display === 'flex') {
        if (e.key === 'ArrowRight') changePhoto(1);
        if (e.key === 'ArrowLeft') changePhoto(-1);
        if (e.key === 'Escape') closeViewer();
    }
});

document.addEventListener('DOMContentLoaded', renderAlbums);