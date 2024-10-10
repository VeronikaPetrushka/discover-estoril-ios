const museum = [
    {
        id: '1',
        name: 'Palacio de Estoril',
        museum: require('../assets/museum/museum-1.png'),
        images: [
            require('../assets/museum/img1.jpg'),
            require('../assets/museum/img2.jpg'),
            require('../assets/museum/img3.jpg')
        ],
        description: 'The Palácio de Estoril is a luxurious hotel built in the 1930s, representing architectural elegance and sophistication. Surrounded by beautiful gardens, the hotel offers more than 150 luxurious rooms. The hotel is known for its classical neoclassical architecture and features antique furniture, sumptuous fabrics, and exquisite paintings.',
        famous: 'During World War II, the Palácio de Estoril became a refuge for royal families. Exiled monarchs from countries like Italy, Spain, and Romania stayed here. It also became a meeting place for high-ranking officials and diplomats.',
        factName: 'History and Celebrities',
        fact: 'During the war, the hotel served as a haven for refugees and hosted important political meetings. Many aristocrats who fled their countries due to Nazi occupation found shelter here. After the war, the hotel continued to welcome famous guests such as Grace Kelly and was even featured in a James Bond film.',
        facts: [
            'During the war, the hotel served as a haven for refugees and hosted important political meetings. Many aristocrats who fled their countries due to Nazi occupation found shelter here. After the war, the hotel continued to welcome famous guests such as Grace Kelly and was even featured in a James Bond film.',
            'In the 1960s, the hotel was a backdrop for several Hollywood films, increasing its popularity among global celebrities.'
        ],
        reward: {
            description: 'You have successfully completed the tour of Palácio de Estoril! Your reward: a unique stamp featuring motifs of the city of Estoril. This collectible stamp is a symbol of your curiosity and passion for exploring the historical treasures of this beautiful city.',
            mark: require('../assets/collection/mark-1.png')
        }
    },
    {
        id: '2',
        name: 'Fortaleza do Guincho',
        museum: require('../assets/museum/museum-2.png'),
        images: [
            require('../assets/museum/img4.jpg'),
            require('../assets/museum/img5.jpg'),
            require('../assets/museum/img6.jpg')
        ],
        description: 'Fortaleza do Guincho, located on the Guincho Cape above the Atlantic Ocean, is one of the oldest defensive structures in the region, built in the 17th century to protect the coast from pirate raids. It features typical military architecture of the time, with massive stone walls and gun emplacements.',
        famous: 'The fort is one of the few fortifications that have retained their original structure and now function as a historical landmark. Today, it is a tourist destination where visitors can learn about the history of military operations on the Atlantic.',
        factName: 'Military Role',
        fact: 'The fort served as a defensive point during numerous pirate attacks and international conflicts, including the war with France in the 18th century. It played an important role in protecting trade routes from coastal raids.',
        facts: [
            'One wing of the fort is now home to an upscale restaurant specializing in seafood, offering stunning views of the ocean.',
            'The fort is often used as a location for artistic films due to its unique setting and epic appearance.'
        ],
        reward: {
            description: 'You have successfully completed the tour of Fortaleza do Guincho! Your reward: a unique stamp featuring motifs of the city of Estoril. This collectible stamp is a symbol of your curiosity and passion for exploring the historical treasures of this beautiful city.',
            mark: require('../assets/collection/mark-2.png')
        }
    },
    {
        id: '3',
        name: 'Farol do Cabo Raso',
        museum: require('../assets/museum/museum-3.png'),
        images: [
            require('../assets/museum/img7.jpeg'),
            require('../assets/museum/img8.jpg'),
            require('../assets/museum/img9.jpg')
        ],
        description: 'The Cabo Raso Lighthouse, built in 1870 on Raso Cape, is one of the key landmarks for sailors along the Atlantic coast. It stands 30 meters tall and features distinctive red-and-white colors, reflecting the traditional design of Portuguese lighthouses.',
        famous: 'The lighthouse is a popular tourist spot due to its breathtaking views of the ocean and the excellent opportunity to observe dolphins and other marine life. It has preserved its authentic architecture and continues to serve as a navigational landmark for ships.',
        factName: 'Navigation History',
        fact: 'The lighthouse played an essential role in ensuring the safety of ships passing near Cabo Raso. Its light is visible for miles and serves as a crucial point of reference for captains in rough weather and fog.',
        facts: [
            'The lighthouse is one of the most photogenic spots in the region, often featured in tourist guides and postcards.',
            'During its renovation in 1999, the lighthouse was equipped with modern technologies while retaining its historical authenticity.'
        ],
        reward: {
            description: ' You have successfully completed the tour of Farol do Cabo Raso! Your reward: a unique stamp featuring motifs of the city of Estoril. This collectible stamp is a symbol of your curiosity and passion for exploring the historical treasures of this beautiful city.',
            mark: require('../assets/collection/mark-3.png')
        }
    },
    {
        id: '4',
        name: 'Igreja de São Bartolomeu',
        museum: require('../assets/museum/museum-4.png'),
        images: [
            require('../assets/museum/img10.jpg'),
            require('../assets/museum/img11.jpg'),
            require('../assets/museum/img12.jpg')
        ],
        description: 'The Church of St. Bartholomew, built in the 18th century in the neo-Manueline style, is one of the oldest and most beautiful churches in Estoril. Its interior is adorned with stained glass windows depicting biblical scenes and detailed statues of saints.',
        famous: 'The church is not only a religious but also a cultural center. It is known for its annual celebrations in honor of St. Bartholomew, which feature grand processions, concerts of church music, and other festivities. The architecture of the church impresses with its refined details and decorations.',
        factName: 'Religious Significance',
        fact: 'The church hosts many important ceremonies, from weddings to baptisms. It also actively engages the community in religious holidays and other events.',
        facts: [
            'The church houses one of the best organs in the region, used during classical and sacred music concerts.',
            'It holds valuable relics, including a statue of St. Bartholomew, considered the protector of the town.'
        ],
        reward: {
            description: 'You have successfully completed the tour of Igreja de São Bartolomeu! Your reward: a unique stamp featuring motifs of the city of Estoril. This collectible stamp is a symbol of your curiosity and passion for exploring the historical treasures of this beautiful city.',
            mark: require('../assets/collection/mark-4.png')
        }
    },
    {
        id: '5',
        name: 'Tamariz Beach',
        museum: require('../assets/museum/museum-5.png'),
        images: [
            require('../assets/museum/img13.jpg'),
            require('../assets/museum/img14.jpg'),
            require('../assets/museum/img15.jpg')
        ],
        description: 'Tamariz Beach is one of the most popular and iconic beaches in Estoril, located right next to the Casino and Palácio de Estoril. Known for its golden sands and crystal-clear waters, the beach is a favorite spot for both locals and tourists. It offers a stunning view of the Atlantic Ocean, along with various facilities such as beach bars, restaurants, and sun loungers. The calm waters and gentle waves make it an ideal location for families and swimmers.',
        famous: 'Tamariz Beach is famous for its vibrant atmosphere during the summer months. Its close proximity to the Estoril railway station makes it easily accessible from Lisbon, attracting many day-trippers. The beach also features a saltwater swimming pool that fills up with the tide, providing a unique experience for visitors.',
        factName: 'History',
        fact: 'Throughout the early 20th century, Tamariz Beach became a prestigious destination for the European elite and royalty. The Estoril coastline, known as the "Portuguese Riviera," was a fashionable retreat, where kings and queens from countries like Spain and Italy would relax. Over the years, the beach became a cultural hub, hosting various summer events, music festivals, and even beach parties.',
        facts: [
            'Tamariz Beach has appeared in several Portuguese films and television series due to its picturesque landscape and proximity to historic landmarks.',
            'The nearby Tamariz Castle, a private residence, adds a sense of mystique and grandeur to the area.'
        ],
        reward: {
            description: 'You have successfully completed the tour of Praia do Tamariz! Your reward: a unique stamp featuring motifs of the city of Estoril. This collectible stamp is a symbol of your curiosity and passion for exploring the natural and historical beauty of this stunning coastal destination.',
            mark: require('../assets/collection/mark-5.png')
        }
    }
];

export default museum;