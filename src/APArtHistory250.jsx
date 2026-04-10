import { useState, useRef, useEffect, useCallback } from "react";

const CONTENT_AREAS = [
  {
    id: 1,
    name: "Global Prehistory",
    period: "30,000–500 B.C.E.",
    color: "#8B6914",
    works: [
      { num: 1, title: "Apollo 11 stones", origin: "Namibia", date: "c. 25,500–25,300 B.C.E.", materials: "Charcoal on stone" },
      { num: 2, title: "Great Hall of the Bulls", origin: "Lascaux, France", date: "15,000–13,000 B.C.E.", materials: "Rock painting" },
      { num: 3, title: "Camelid sacrum in the shape of a canine", origin: "Tequixquiac, central Mexico", date: "14,000–7000 B.C.E.", materials: "Bone" },
      { num: 4, title: "Running horned woman", origin: "Tassili n'Ajjer, Algeria", date: "6000–4000 B.C.E.", materials: "Pigment on rock" },
      { num: 5, title: "Beaker with ibex motifs", origin: "Susa, Iran", date: "4200–3500 B.C.E.", materials: "Painted terra cotta" },
      { num: 6, title: "Anthropomorphic stele", origin: "Arabian Peninsula", date: "Fourth millennium B.C.E.", materials: "Sandstone" },
      { num: 7, title: "Jade cong", origin: "Liangzhu, China", date: "3300–2200 B.C.E.", materials: "Carved jade" },
      { num: 8, title: "Stonehenge", origin: "Wiltshire, UK", date: "c. 2500–1600 B.C.E.", materials: "Sandstone" },
      { num: 9, title: "The Ambum Stone", origin: "Ambum Valley, Papua New Guinea", date: "c. 1500 B.C.E.", materials: "Greywacke" },
      { num: 10, title: "Tlatilco female figurine", origin: "Central Mexico", date: "1200–900 B.C.E.", materials: "Ceramic" },
      { num: 11, title: "Terra cotta fragment", origin: "Solomon Islands, Reef Islands", date: "1000 B.C.E.", materials: "Terra cotta (incised)" },
    ]
  },
  {
    id: 2,
    name: "Ancient Mediterranean",
    period: "3500 B.C.E.–300 C.E.",
    color: "#1a5276",
    works: [
      { num: 12, title: "White Temple and its ziggurat", origin: "Uruk (modern Warka, Iraq)", date: "c. 3500–3000 B.C.E.", materials: "Mud brick" },
      { num: 13, title: "Palette of King Narmer", origin: "Predynastic Egypt", date: "c. 3000–2920 B.C.E.", materials: "Greywacke" },
      { num: 14, title: "Statues of votive figures, from the Square Temple at Eshnunna", origin: "Modern Tell Asmar, Iraq", date: "c. 2700 B.C.E.", materials: "Gypsum inlaid with shell and black limestone" },
      { num: 15, title: "Seated scribe", origin: "Saqqara, Egypt", date: "c. 2620–2500 B.C.E.", materials: "Painted limestone" },
      { num: 16, title: "Standard of Ur from the Royal Tombs at Ur", origin: "Modern Tell el-Muqayyar, Iraq", date: "c. 2600–2400 B.C.E.", materials: "Wood inlaid with shell, lapis lazuli, and red limestone" },
      { num: 17, title: "Great Pyramids and Great Sphinx", origin: "Giza, Egypt", date: "c. 2550–2490 B.C.E.", materials: "Cut limestone" },
      { num: 18, title: "King Menkaura and queen", origin: "Old Kingdom, Egypt", date: "c. 2490–2472 B.C.E.", materials: "Greywacke" },
      { num: 19, title: "The Code of Hammurabi", origin: "Babylon (modern Iran)", date: "c. 1792–1750 B.C.E.", materials: "Basalt" },
      { num: 20, title: "Temple of Amun-Re and Hypostyle Hall", origin: "Karnak, near Luxor, Egypt", date: "c. 1550 B.C.E.; hall: c. 1250 B.C.E.", materials: "Cut sandstone and mud brick" },
      { num: 21, title: "Mortuary temple of Hatshepsut", origin: "Near Luxor, Egypt", date: "c. 1473–1458 B.C.E.", materials: "Sandstone, partially carved into rock cliff" },
      { num: 22, title: "Akhenaton, Nefertiti, and three daughters", origin: "New Kingdom, Egypt", date: "c. 1353–1335 B.C.E.", materials: "Limestone" },
      { num: 23, title: "Tutankhamun's tomb, innermost coffin", origin: "New Kingdom, Egypt", date: "c. 1323 B.C.E.", materials: "Gold with inlay of enamel and semiprecious stones" },
      { num: 24, title: "Last judgment of Hu-Nefer, from his tomb", origin: "New Kingdom, Egypt", date: "c. 1275 B.C.E.", materials: "Painted papyrus scroll" },
      { num: 25, title: "Lamassu from the citadel of Sargon II", origin: "Dur Sharrukin (modern Khorsabad, Iraq)", date: "c. 720–705 B.C.E.", materials: "Alabaster" },
      { num: 26, title: "Athenian agora", origin: "Athens, Greece", date: "600 B.C.E.–150 C.E.", materials: "Plan" },
      { num: 27, title: "Anavysos Kouros", origin: "Archaic Greek", date: "c. 530 B.C.E.", materials: "Marble with remnants of paint" },
      { num: 28, title: "Peplos Kore from the Acropolis", origin: "Archaic Greek", date: "c. 530 B.C.E.", materials: "Marble, painted details" },
      { num: 29, title: "Sarcophagus of the Spouses", origin: "Etruscan", date: "c. 520 B.C.E.", materials: "Terra cotta" },
      { num: 30, title: "Audience Hall (apadana) of Darius and Xerxes", origin: "Persepolis, Iran", date: "c. 520–465 B.C.E.", materials: "Limestone" },
      { num: 31, title: "Temple of Minerva and sculpture of Apollo", origin: "Veii, near Rome, Italy", date: "c. 510–500 B.C.E.", materials: "Wood, mud brick, tufa; terra cotta sculpture" },
      { num: 32, title: "Tomb of the Triclinium", origin: "Tarquinia, Italy", date: "c. 480–470 B.C.E.", materials: "Tufa and fresco" },
      { num: 33, title: "Niobides Krater", origin: "Classical Greece", date: "c. 460–450 B.C.E.", materials: "Clay, red-figure technique" },
      { num: 34, title: "Doryphoros (Spear Bearer)", origin: "Polykleitos", date: "Original 450–440 B.C.E.", materials: "Roman copy (marble) of Greek original (bronze)" },
      { num: 35, title: "Acropolis", origin: "Athens, Greece", date: "c. 447–410 B.C.E.", materials: "Marble" },
      { num: 36, title: "Grave stele of Hegeso", origin: "Attributed to Kallimachos", date: "c. 410 B.C.E.", materials: "Marble and paint" },
      { num: 37, title: "Winged Victory of Samothrace", origin: "Hellenistic Greek", date: "c. 190 B.C.E.", materials: "Marble" },
      { num: 38, title: "Great Altar of Zeus and Athena at Pergamon", origin: "Asia Minor (present-day Turkey)", date: "c. 175 B.C.E.", materials: "Marble" },
      { num: 39, title: "House of the Vettii", origin: "Pompeii, Italy", date: "c. second century B.C.E.", materials: "Cut stone and fresco" },
      { num: 40, title: "Alexander Mosaic from the House of Faun", origin: "Pompeii", date: "c. 100 B.C.E.", materials: "Mosaic" },
      { num: 41, title: "Seated boxer", origin: "Hellenistic Greek", date: "c. 100 B.C.E.", materials: "Bronze" },
      { num: 42, title: "Head of a Roman patrician", origin: "Republican Roman", date: "c. 75–50 B.C.E.", materials: "Marble" },
      { num: 43, title: "Augustus of Prima Porta", origin: "Imperial Roman", date: "Early first century C.E.", materials: "Marble" },
      { num: 44, title: "Colosseum (Flavian Amphitheater)", origin: "Rome, Italy", date: "70–80 C.E.", materials: "Stone and concrete" },
      { num: 45, title: "Forum of Trajan", origin: "Rome, Italy", date: "106–112 C.E.", materials: "Brick and concrete; marble (column)" },
      { num: 46, title: "Pantheon", origin: "Imperial Roman", date: "118–125 C.E.", materials: "Concrete with stone facing" },
      { num: 47, title: "Ludovisi Battle Sarcophagus", origin: "Late Imperial Roman", date: "c. 250 C.E.", materials: "Marble" },
    ]
  },
  {
    id: 3,
    name: "Early Europe and Colonial Americas",
    period: "200–1750 C.E.",
    color: "#6c3461",
    works: [
      { num: 48, title: "Catacomb of Priscilla", origin: "Rome, Italy", date: "c. 200–400 C.E.", materials: "Excavated tufa and fresco" },
      { num: 49, title: "Santa Sabina", origin: "Rome, Italy", date: "c. 422–432 C.E.", materials: "Brick and stone, wooden roof" },
      { num: 50, title: "Rebecca and Eliezer at the Well, from the Vienna Genesis", origin: "Early Byzantine Europe", date: "Early sixth century C.E.", materials: "Illuminated manuscript" },
      { num: 51, title: "San Vitale", origin: "Ravenna, Italy", date: "c. 526–547 C.E.", materials: "Brick, marble, stone veneer; mosaic" },
      { num: 52, title: "Hagia Sophia", origin: "Constantinople (Istanbul)", date: "532–537 C.E.", materials: "Brick and ceramic elements with stone and mosaic" },
      { num: 53, title: "Merovingian looped fibulae", origin: "Early medieval Europe", date: "Mid-sixth century C.E.", materials: "Silver gilt, filigree, garnets" },
      { num: 54, title: "Virgin (Theotokos) and Child between Saints Theodore and George", origin: "Early Byzantine Europe", date: "Sixth or early seventh century C.E.", materials: "Encaustic on wood" },
      { num: 55, title: "Lindisfarne Gospels", origin: "Early medieval (Hiberno Saxon) Europe", date: "c. 700 C.E.", materials: "Illuminated manuscript" },
      { num: 56, title: "Great Mosque", origin: "Córdoba, Spain", date: "c. 785–786 C.E.", materials: "Stone masonry" },
      { num: 57, title: "Pyxis of al-Mughira", origin: "Umayyad", date: "c. 968 C.E.", materials: "Ivory" },
      { num: 58, title: "Church of Sainte-Foy", origin: "Conques, France", date: "c. 1050–1130 C.E.", materials: "Stone; gold, silver, gemstones (reliquary)" },
      { num: 59, title: "Bayeux Tapestry", origin: "Romanesque Europe", date: "c. 1066–1080 C.E.", materials: "Embroidery on linen" },
      { num: 60, title: "Chartres Cathedral", origin: "Chartres, France", date: "c. 1145–1155 C.E.; rebuilt c. 1194–1220 C.E.", materials: "Limestone, stained glass" },
      { num: 61, title: "Dedication Page with Blanche of Castile and King Louis IX", origin: "Gothic Europe", date: "c. 1225–1245 C.E.", materials: "Illuminated manuscript" },
      { num: 62, title: "Röttgen Pietà", origin: "Late medieval Europe", date: "c. 1300–1325 C.E.", materials: "Painted wood" },
      { num: 63, title: "Arena (Scrovegni) Chapel, including Lamentation", origin: "Padua, Italy", date: "Chapel: c. 1303 C.E.; Fresco: c. 1305", materials: "Brick and fresco" },
      { num: 64, title: "Golden Haggadah", origin: "Late medieval Spain", date: "c. 1320 C.E.", materials: "Illuminated manuscript" },
      { num: 65, title: "Alhambra", origin: "Granada, Spain", date: "1354–1391 C.E.", materials: "Whitewashed adobe stucco, wood, tile, paint, gilding" },
      { num: 66, title: "Annunciation Triptych (Merode Altarpiece)", origin: "Workshop of Robert Campin", date: "1427–1432 C.E.", materials: "Oil on wood" },
      { num: 67, title: "Pazzi Chapel", origin: "Florence, Italy", date: "c. 1429–1461 C.E.", materials: "Masonry" },
      { num: 68, title: "The Arnolfini Portrait", origin: "Jan van Eyck", date: "c. 1434 C.E.", materials: "Oil on wood" },
      { num: 69, title: "David", origin: "Donatello", date: "c. 1440–1460 C.E.", materials: "Bronze" },
      { num: 70, title: "Palazzo Rucellai", origin: "Florence, Italy", date: "c. 1450 C.E.", materials: "Stone, masonry" },
      { num: 71, title: "Madonna and Child with Two Angels", origin: "Fra Filippo Lippi", date: "c. 1465 C.E.", materials: "Tempera on wood" },
      { num: 72, title: "Birth of Venus", origin: "Sandro Botticelli", date: "c. 1484–1486 C.E.", materials: "Tempera on canvas" },
      { num: 73, title: "Last Supper", origin: "Leonardo da Vinci", date: "c. 1494–1498 C.E.", materials: "Oil and tempera" },
      { num: 74, title: "Adam and Eve", origin: "Albrecht Dürer", date: "1504 C.E.", materials: "Engraving" },
      { num: 75, title: "Sistine Chapel ceiling and altar wall frescoes", origin: "Vatican City, Italy", date: "Ceiling: c. 1508–1512; Altar: c. 1536–1541 C.E.", materials: "Fresco" },
      { num: 76, title: "School of Athens", origin: "Raphael", date: "1509–1511 C.E.", materials: "Fresco" },
      { num: 77, title: "Isenheim altarpiece", origin: "Matthias Grünewald", date: "c. 1512–1516 C.E.", materials: "Oil on wood" },
      { num: 78, title: "Entombment of Christ", origin: "Jacopo da Pontormo", date: "1525–1528 C.E.", materials: "Oil on wood" },
      { num: 79, title: "Allegory of Law and Grace", origin: "Lucas Cranach the Elder", date: "c. 1530 C.E.", materials: "Woodcut and letterpress" },
      { num: 80, title: "Venus of Urbino", origin: "Titian", date: "c. 1538 C.E.", materials: "Oil on canvas" },
      { num: 81, title: "Frontispiece of the Codex Mendoza", origin: "Viceroyalty of New Spain", date: "c. 1541–1542 C.E.", materials: "Ink and color on paper" },
      { num: 82, title: "Il Gesù, including Triumph of the Name of Jesus ceiling fresco", origin: "Rome, Italy", date: "16th century C.E.", materials: "Brick, marble, fresco, stucco" },
      { num: 83, title: "Hunters in the Snow", origin: "Pieter Bruegel the Elder", date: "1565 C.E.", materials: "Oil on wood" },
      { num: 84, title: "Mosque of Selim II", origin: "Edirne, Turkey", date: "1568–1575 C.E.", materials: "Brick and stone" },
      { num: 85, title: "Calling of Saint Matthew", origin: "Caravaggio", date: "c. 1597–1601 C.E.", materials: "Oil on canvas" },
      { num: 86, title: "Henri IV Receives the Portrait of Marie de' Medici", origin: "Peter Paul Rubens", date: "1621–1625 C.E.", materials: "Oil on canvas" },
      { num: 87, title: "Self-Portrait with Saskia", origin: "Rembrandt van Rijn", date: "1636 C.E.", materials: "Etching" },
      { num: 88, title: "San Carlo alle Quattro Fontane", origin: "Rome, Italy", date: "1638–1646 C.E.", materials: "Stone and stucco" },
      { num: 89, title: "Ecstasy of Saint Teresa", origin: "Rome, Italy", date: "c. 1647–1652 C.E.", materials: "Marble; stucco and gilt bronze" },
      { num: 90, title: "Angel with Arquebus, Asiel Timor Dei", origin: "Master of Calamarca", date: "c. 17th century C.E.", materials: "Oil on canvas" },
      { num: 91, title: "Las Meninas", origin: "Diego Velázquez", date: "c. 1656 C.E.", materials: "Oil on canvas" },
      { num: 92, title: "Woman Holding a Balance", origin: "Johannes Vermeer", date: "c. 1664 C.E.", materials: "Oil on canvas" },
      { num: 93, title: "The Palace at Versailles", origin: "Versailles, France", date: "Begun 1669 C.E.", materials: "Masonry, stone, wood, iron, gold leaf" },
      { num: 94, title: "Screen with the Siege of Belgrade and hunting scene", origin: "Circle of the González Family", date: "c. 1697–1701 C.E.", materials: "Tempera and resin on wood, shell inlay" },
      { num: 95, title: "The Virgin of Guadalupe (Virgen de Guadalupe)", origin: "Miguel González", date: "c. 1698 C.E.", materials: "Oil on canvas on wood, mother-of-pearl" },
      { num: 96, title: "Fruit and Insects", origin: "Rachel Ruysch", date: "1711 C.E.", materials: "Oil on wood" },
      { num: 97, title: "Spaniard and Indian Produce a Mestizo", origin: "Attributed to Juan Rodríguez Juárez", date: "c. 1715 C.E.", materials: "Oil on canvas" },
      { num: 98, title: "The Tête à Tête, from Marriage à la Mode", origin: "William Hogarth", date: "c. 1743 C.E.", materials: "Oil on canvas" },
    ]
  },
  {
    id: 4,
    name: "Later Europe and Americas",
    period: "1750–1980 C.E.",
    color: "#1e6b45",
    works: [
      { num: 99, title: "Portrait of Sor Juana Inés de la Cruz", origin: "Miguel Cabrera", date: "c. 1750 C.E.", materials: "Oil on canvas" },
      { num: 100, title: "A Philosopher Giving a Lecture on the Orrery", origin: "Joseph Wright of Derby", date: "c. 1763–1765 C.E.", materials: "Oil on canvas" },
      { num: 101, title: "The Swing", origin: "Jean-Honoré Fragonard", date: "1767 C.E.", materials: "Oil on canvas" },
      { num: 102, title: "Monticello", origin: "Virginia, U.S.", date: "1768–1809 C.E.", materials: "Brick, glass, stone, and wood" },
      { num: 103, title: "The Oath of the Horatii", origin: "Jacques-Louis David", date: "1784 C.E.", materials: "Oil on canvas" },
      { num: 104, title: "George Washington", origin: "Jean-Antoine Houdon", date: "1788–1792 C.E.", materials: "Marble" },
      { num: 105, title: "Self-Portrait", origin: "Elisabeth Louise Vigée Le Brun", date: "1790 C.E.", materials: "Oil on canvas" },
      { num: 106, title: "Y no hai remedio, from Los Desastres de la Guerra", origin: "Francisco de Goya", date: "1810–1823 C.E.", materials: "Etching, drypoint, burin, and burnishing" },
      { num: 107, title: "La Grande Odalisque", origin: "Jean-Auguste-Dominique Ingres", date: "1814 C.E.", materials: "Oil on canvas" },
      { num: 108, title: "Liberty Leading the People", origin: "Eugène Delacroix", date: "1830 C.E.", materials: "Oil on canvas" },
      { num: 109, title: "The Oxbow", origin: "Thomas Cole", date: "1836 C.E.", materials: "Oil on canvas" },
      { num: 110, title: "Still Life in Studio", origin: "Louis-Jacques-Mandé Daguerre", date: "1837 C.E.", materials: "Daguerreotype" },
      { num: 111, title: "Slave Ship", origin: "Joseph Mallord William Turner", date: "1840 C.E.", materials: "Oil on canvas" },
      { num: 112, title: "Palace of Westminster (Houses of Parliament)", origin: "London, England", date: "1840–1870 C.E.", materials: "Limestone masonry and glass" },
      { num: 113, title: "The Stone Breakers", origin: "Gustave Courbet", date: "1849 C.E. (destroyed 1945)", materials: "Oil on canvas" },
      { num: 114, title: "Nadar Raising Photography to the Height of Art", origin: "Honoré Daumier", date: "1862 C.E.", materials: "Lithograph" },
      { num: 115, title: "Olympia", origin: "Édouard Manet", date: "1863 C.E.", materials: "Oil on canvas" },
      { num: 116, title: "The Saint-Lazare Station", origin: "Claude Monet", date: "1877 C.E.", materials: "Oil on canvas" },
      { num: 117, title: "The Horse in Motion", origin: "Eadweard Muybridge", date: "1878 C.E.", materials: "Albumen print" },
      { num: 118, title: "The Valley of Mexico from the Hillside of Santa Isabel", origin: "Jose María Velasco", date: "1882 C.E.", materials: "Oil on canvas" },
      { num: 119, title: "The Burghers of Calais", origin: "Auguste Rodin", date: "1884–1895 C.E.", materials: "Bronze" },
      { num: 120, title: "The Starry Night", origin: "Vincent van Gogh", date: "1889 C.E.", materials: "Oil on canvas" },
      { num: 121, title: "The Coiffure", origin: "Mary Cassatt", date: "1890–1891 C.E.", materials: "Drypoint and aquatint" },
      { num: 122, title: "The Scream", origin: "Edvard Munch", date: "1893 C.E.", materials: "Tempera and pastels on cardboard" },
      { num: 123, title: "Where Do We Come From? What Are We? Where Are We Going?", origin: "Paul Gauguin", date: "1897–1898 C.E.", materials: "Oil on canvas" },
      { num: 124, title: "Carson, Pirie, Scott and Company Building", origin: "Chicago, Illinois, U.S.", date: "1899–1903 C.E.", materials: "Iron, steel, glass, and terra cotta" },
      { num: 125, title: "Mont Sainte-Victoire", origin: "Paul Cézanne", date: "1902–1904 C.E.", materials: "Oil on canvas" },
      { num: 126, title: "Les Demoiselles d'Avignon", origin: "Pablo Picasso", date: "1907 C.E.", materials: "Oil on canvas" },
      { num: 127, title: "The Steerage", origin: "Alfred Stieglitz", date: "1907 C.E.", materials: "Photogravure" },
      { num: 128, title: "The Kiss", origin: "Gustav Klimt", date: "1907–1908 C.E.", materials: "Oil and gold leaf on canvas" },
      { num: 129, title: "The Kiss", origin: "Constantin Brancusi", date: "1907–1908 C.E.", materials: "Limestone" },
      { num: 130, title: "The Portuguese", origin: "Georges Braque", date: "1911 C.E.", materials: "Oil on canvas" },
      { num: 131, title: "Goldfish", origin: "Henri Matisse", date: "1912 C.E.", materials: "Oil on canvas" },
      { num: 132, title: "Improvisation 28 (second version)", origin: "Vassily Kandinsky", date: "1912 C.E.", materials: "Oil on canvas" },
      { num: 133, title: "Self-Portrait as a Soldier", origin: "Ernst Ludwig Kirchner", date: "1915 C.E.", materials: "Oil on canvas" },
      { num: 134, title: "Memorial Sheet for Karl Liebknecht", origin: "Käthe Kollwitz", date: "1919–1920 C.E.", materials: "Woodcut" },
      { num: 135, title: "Villa Savoye", origin: "Poissy-sur-Seine, France", date: "1929 C.E.", materials: "Steel and reinforced concrete" },
      { num: 136, title: "Composition with Red, Blue and Yellow", origin: "Piet Mondrian", date: "1930 C.E.", materials: "Oil on canvas" },
      { num: 137, title: "Illustration from The Results of the First Five-Year Plan", origin: "Varvara Stepanova", date: "1932 C.E.", materials: "Photomontage" },
      { num: 138, title: "Object (Le Déjeuner en fourrure)", origin: "Meret Oppenheim", date: "1936 C.E.", materials: "Fur-covered cup, saucer, and spoon" },
      { num: 139, title: "Fallingwater", origin: "Pennsylvania, U.S.", date: "1936–1939 C.E.", materials: "Reinforced concrete, sandstone, steel, glass" },
      { num: 140, title: "The Two Fridas", origin: "Frida Kahlo", date: "1939 C.E.", materials: "Oil on canvas" },
      { num: 141, title: "The Migration of the Negro, Panel no. 49", origin: "Jacob Lawrence", date: "1940–1941 C.E.", materials: "Casein tempera on hardboard" },
      { num: 142, title: "The Jungle", origin: "Wifredo Lam", date: "1943 C.E.", materials: "Gouache on paper mounted on canvas" },
      { num: 143, title: "Dream of a Sunday Afternoon in the Alameda Park", origin: "Diego Rivera", date: "1947–1948 C.E.", materials: "Fresco" },
      { num: 144, title: "Fountain (second version)", origin: "Marcel Duchamp", date: "1950 C.E. (original 1917)", materials: "Readymade glazed sanitary china" },
      { num: 145, title: "Woman, I", origin: "Willem de Kooning", date: "1950–1952 C.E.", materials: "Oil on canvas" },
      { num: 146, title: "Seagram Building", origin: "New York City, U.S.", date: "1954–1958 C.E.", materials: "Steel frame with glass curtain wall and bronze" },
      { num: 147, title: "Marilyn Diptych", origin: "Andy Warhol", date: "1962 C.E.", materials: "Oil, acrylic, and silkscreen enamel on canvas" },
      { num: 148, title: "Narcissus Garden", origin: "Yayoi Kusama", date: "1966 C.E.", materials: "Mirror balls" },
      { num: 149, title: "The Bay", origin: "Helen Frankenthaler", date: "1963 C.E.", materials: "Acrylic on canvas" },
      { num: 150, title: "Lipstick (Ascending) on Caterpillar Tracks", origin: "Claes Oldenburg", date: "1969–1974 C.E.", materials: "Cor-Ten steel, aluminum, cast resin" },
      { num: 151, title: "Spiral Jetty", origin: "Great Salt Lake, Utah, U.S.", date: "1970 C.E.", materials: "Mud, salt crystals, rocks, water" },
      { num: 152, title: "House in New Castle County", origin: "Delaware, U.S.", date: "1978–1983 C.E.", materials: "Wood frame and stucco" },
    ]
  },
  {
    id: 5,
    name: "Indigenous Americas",
    period: "1000 B.C.E.–1980 C.E.",
    color: "#b35900",
    works: [
      { num: 153, title: "Chavín de Huántar", origin: "Northern highlands, Peru", date: "900–200 B.C.E.", materials: "Stone; granite; hammered gold alloy" },
      { num: 154, title: "Mesa Verde cliff dwellings", origin: "Montezuma County, Colorado", date: "450–1300 C.E.", materials: "Sandstone" },
      { num: 155, title: "Yaxchilán", origin: "Chiapas, Mexico", date: "725 C.E.", materials: "Limestone" },
      { num: 156, title: "Great Serpent Mound", origin: "Adams County, Ohio", date: "c. 1070 C.E.", materials: "Earthwork/effigy mound" },
      { num: 157, title: "Templo Mayor (Main Temple)", origin: "Tenochtitlan (modern Mexico City)", date: "1375–1520 C.E.", materials: "Stone; volcanic stone; jadeite; basalt" },
      { num: 158, title: "Ruler's feather headdress (probably of Motecuhzoma II)", origin: "Mexica (Aztec)", date: "1428–1520 C.E.", materials: "Feathers (quetzal and cotinga) and gold" },
      { num: 159, title: "City of Cusco, including Qorikancha and Saqsa Waman", origin: "Central highlands, Peru", date: "c. 1440 C.E.", materials: "Andesite" },
      { num: 160, title: "Maize cobs", origin: "Inka", date: "c. 1440–1533 C.E.", materials: "Sheet metal/repoussé, metal alloys" },
      { num: 161, title: "City of Machu Picchu", origin: "Central highlands, Peru", date: "c. 1450–1540 C.E.", materials: "Granite" },
      { num: 162, title: "All-T'oqapu tunic", origin: "Inka", date: "1450–1540 C.E.", materials: "Camelid fiber and cotton" },
      { num: 163, title: "Bandolier bag", origin: "Lenape (Delaware tribe)", date: "c. 1850 C.E.", materials: "Beadwork on leather" },
      { num: 164, title: "Transformation mask", origin: "Kwakwaka'wakw, Northwest coast of Canada", date: "Late 19th century C.E.", materials: "Wood, paint, and string" },
      { num: 165, title: "Painted elk hide", origin: "Attributed to Cotsiogo (Cadzi Cody)", date: "c. 1890–1900 C.E.", materials: "Painted elk hide" },
      { num: 166, title: "Black-on-black ceramic vessel", origin: "Maria Martínez and Julian Martínez", date: "c. mid-20th century C.E.", materials: "Blackware ceramic" },
    ]
  },
  {
    id: 6,
    name: "Africa",
    period: "1100–1980 C.E.",
    color: "#922b21",
    works: [
      { num: 167, title: "Conical tower and circular wall of Great Zimbabwe", origin: "Southeastern Zimbabwe", date: "c. 1000–1400 C.E.", materials: "Coursed granite blocks" },
      { num: 168, title: "Great Mosque of Djenné", origin: "Mali", date: "Founded c. 1200 C.E.; rebuilt 1906–1907", materials: "Adobe" },
      { num: 169, title: "Wall plaque, from Oba's palace", origin: "Edo peoples, Benin (Nigeria)", date: "16th century C.E.", materials: "Cast brass" },
      { num: 170, title: "Sika dwa kofi (Golden Stool)", origin: "Ashanti peoples, Ghana", date: "c. 1700 C.E.", materials: "Gold over wood and cast-gold attachments" },
      { num: 171, title: "Ndop (portrait figure) of King Mishe miShyaang maMbul", origin: "Kuba peoples, DRC", date: "c. 1760–1780 C.E.", materials: "Wood" },
      { num: 172, title: "Power figure (Nkisi n'kondi)", origin: "Kongo peoples, DRC", date: "c. late 19th century C.E.", materials: "Wood and metal" },
      { num: 173, title: "Female (Pwo) mask", origin: "Chokwe peoples, DRC", date: "Late 19th to early 20th century C.E.", materials: "Wood, fiber, pigment, metal" },
      { num: 174, title: "Portrait mask (Mblo)", origin: "Baule peoples, Côte d'Ivoire", date: "Early 20th century C.E.", materials: "Wood and pigment" },
      { num: 175, title: "Bundu mask", origin: "Sande Society, Mende peoples", date: "19th to 20th century C.E.", materials: "Wood, cloth, and fiber" },
      { num: 176, title: "Ikenga (shrine figure)", origin: "Igbo peoples, Nigeria", date: "c. 19th to 20th century C.E.", materials: "Wood" },
      { num: 177, title: "Lukasa (memory board)", origin: "Mbudye Society, Luba peoples, DRC", date: "c. 19th to 20th century C.E.", materials: "Wood, beads, and metal" },
      { num: 178, title: "Aka elephant mask", origin: "Bamileke, Cameroon", date: "c. 19th to 20th century C.E.", materials: "Wood, woven raffia, cloth, beads" },
      { num: 179, title: "Reliquary figure (byeri)", origin: "Fang peoples, southern Cameroon", date: "c. 19th to 20th century C.E.", materials: "Wood" },
      { num: 180, title: "Veranda post of enthroned king and senior wife (Opo Ogoga)", origin: "Olowe of Ise, Yoruba peoples", date: "c. 1910–1914 C.E.", materials: "Wood and pigment" },
    ]
  },
  {
    id: 7,
    name: "West and Central Asia",
    period: "500 B.C.E.–1980 C.E.",
    color: "#1a6b6b",
    works: [
      { num: 181, title: "Petra, Jordan: Treasury and Great Temple", origin: "Nabataean Ptolemaic and Roman", date: "c. 400 B.C.E.–100 C.E.", materials: "Cut rock" },
      { num: 182, title: "Buddha", origin: "Bamiyan, Afghanistan", date: "c. 400–800 C.E. (destroyed 2001)", materials: "Cut rock with plaster and polychrome paint" },
      { num: 183, title: "The Kaaba", origin: "Mecca, Saudi Arabia", date: "Pre-Islamic; rededicated 631–632 C.E.", materials: "Granite masonry, silk curtain, gold and silver thread" },
      { num: 184, title: "Jowo Rinpoche, enshrined in the Jokhang Temple", origin: "Lhasa, Tibet", date: "Believed brought to Tibet in 641 C.E.", materials: "Gilt metals with semiprecious stones" },
      { num: 185, title: "Dome of the Rock", origin: "Jerusalem", date: "691–692 C.E.", materials: "Stone masonry, glazed ceramic tile, mosaics" },
      { num: 186, title: "Great Mosque (Masjid-e Jameh)", origin: "Isfahan, Iran", date: "c. 700 C.E.; additions 14th–20th centuries", materials: "Stone, brick, wood, plaster, glazed ceramic tile" },
      { num: 187, title: "Folio from a Qur'an", origin: "Arab, North Africa, or Near East", date: "c. eighth to ninth century C.E.", materials: "Ink, color, and gold on parchment" },
      { num: 188, title: "Basin (Baptistère de St. Louis)", origin: "Muhammad ibn al-Zain", date: "c. 1320–1340 C.E.", materials: "Brass inlaid with gold and silver" },
      { num: 189, title: "Bahram Gur Fights the Karg, from the Great Il-Khanid Shahnama", origin: "Islamic; Persian, Il'Khanid", date: "c. 1330–1340 C.E.", materials: "Ink, watercolor, gold, silver on paper" },
      { num: 190, title: "The Court of Gayumars, from Shah Tahmasp's Shahnama", origin: "Sultan Muhammad", date: "c. 1522–1525 C.E.", materials: "Ink, watercolor, and gold on paper" },
      { num: 191, title: "The Ardabil Carpet", origin: "Maqsud of Kashan", date: "1539–1540 C.E.", materials: "Silk and wool" },
    ]
  },
  {
    id: 8,
    name: "South, East, and Southeast Asia",
    period: "300 B.C.E.–1980 C.E.",
    color: "#7d3c98",
    works: [
      { num: 192, title: "Great Stupa at Sanchi", origin: "Madhya Pradesh, India", date: "c. 300 B.C.E.–100 C.E.", materials: "Stone masonry, sandstone on dome" },
      { num: 193, title: "Terra cotta warriors from mausoleum of the first Qin emperor", origin: "Qin Dynasty, China", date: "c. 221–209 B.C.E.", materials: "Painted terra cotta" },
      { num: 194, title: "Funeral banner of Lady Dai (Xin Zhui)", origin: "Han Dynasty, China", date: "c. 180 B.C.E.", materials: "Painted silk" },
      { num: 195, title: "Longmen caves", origin: "Luoyang, China", date: "493–1127 C.E.", materials: "Limestone" },
      { num: 196, title: "Gold and jade crown", origin: "Three Kingdoms Period, Silla Kingdom, Korea", date: "Fifth to sixth century C.E.", materials: "Metalwork" },
      { num: 197, title: "Todai-ji", origin: "Nara, Japan", date: "743 C.E.; rebuilt c. 1700", materials: "Bronze and wood; ceramic-tile roofing" },
      { num: 198, title: "Borobudur Temple", origin: "Central Java, Indonesia", date: "c. 750–842 C.E.", materials: "Volcanic-stone masonry" },
      { num: 199, title: "Angkor, the temple of Angkor Wat, and Angkor Thom", origin: "Cambodia", date: "c. 800–1400 C.E.", materials: "Stone masonry, sandstone" },
      { num: 200, title: "Lakshmana Temple", origin: "Khajuraho, India", date: "c. 930–950 C.E.", materials: "Sandstone" },
      { num: 201, title: "Travelers among Mountains and Streams", origin: "Fan Kuan", date: "c. 1000 C.E.", materials: "Ink and colors on silk" },
      { num: 202, title: "Shiva as Lord of Dance (Nataraja)", origin: "India (Tamil Nadu), Chola Dynasty", date: "c. 11th century C.E.", materials: "Cast bronze" },
      { num: 203, title: "Night Attack on the Sanjô Palace", origin: "Kamakura Period, Japan", date: "c. 1250–1300 C.E.", materials: "Handscroll (ink and color on paper)" },
      { num: 204, title: "The David Vases", origin: "Yuan Dynasty, China", date: "1351 C.E.", materials: "White porcelain with cobalt-blue underglaze" },
      { num: 205, title: "Portrait of Sin Sukju (1417–1475)", origin: "Imperial Bureau of Painting", date: "c. 15th century C.E.", materials: "Hanging scroll (ink and color on silk)" },
      { num: 206, title: "Forbidden City", origin: "Beijing, China", date: "15th century C.E. and later", materials: "Stone masonry, marble, brick, wood, ceramic tile" },
      { num: 207, title: "Ryoan-ji", origin: "Kyoto, Japan", date: "c. 1480 C.E.", materials: "Rock garden" },
      { num: 208, title: "Jahangir Preferring a Sufi Shaikh to Kings", origin: "Bichitr", date: "c. 1620 C.E.", materials: "Watercolor, gold, and ink on paper" },
      { num: 209, title: "Taj Mahal", origin: "Agra, India", date: "1632–1653 C.E.", materials: "Stone masonry, marble with inlay of precious stones" },
      { num: 210, title: "White and Red Plum Blossoms", origin: "Ogata Korin", date: "c. 1710–1716 C.E.", materials: "Ink, watercolor, and gold leaf on paper" },
      { num: 211, title: "Under the Wave off Kanagawa (The Great Wave)", origin: "Katsushika Hokusai", date: "1830–1833 C.E.", materials: "Polychrome woodblock print" },
      { num: 212, title: "Chairman Mao en Route to Anyuan", origin: "Based on painting by Liu Chunhua", date: "c. 1969 C.E.", materials: "Color lithograph" },
    ]
  },
  {
    id: 9,
    name: "The Pacific",
    period: "700–1980 C.E.",
    color: "#2471a3",
    works: [
      { num: 213, title: "Nan Madol", origin: "Pohnpei, Micronesia", date: "c. 700–1600 C.E.", materials: "Basalt boulders and prismatic columns" },
      { num: 214, title: "Moai on platform (ahu)", origin: "Rapa Nui (Easter Island)", date: "c. 1100–1600 C.E.", materials: "Volcanic tuff figures on basalt base" },
      { num: 215, title: "'Ahu 'ula (feather cape)", origin: "Hawaiian", date: "Late 18th century C.E.", materials: "Feathers and fiber" },
      { num: 216, title: "Staff god", origin: "Rarotonga, Cook Islands", date: "Late 18th to early 19th century C.E.", materials: "Wood, tapa, fiber, and feathers" },
      { num: 217, title: "Female deity", origin: "Nukuoro, Micronesia", date: "c. 18th to 19th century C.E.", materials: "Wood" },
      { num: 218, title: "Buk (mask)", origin: "Torres Strait", date: "Mid- to late 19th century C.E.", materials: "Turtle shell, wood, fiber, feathers, shell" },
      { num: 219, title: "Hiapo (tapa)", origin: "Niue", date: "c. 1850–1900 C.E.", materials: "Tapa or bark cloth, freehand painting" },
      { num: 220, title: "Tamati Waka Nene", origin: "Gottfried Lindauer", date: "1890 C.E.", materials: "Oil on canvas" },
      { num: 221, title: "Navigation chart", origin: "Marshall Islands, Micronesia", date: "19th to early 20th century C.E.", materials: "Wood and fiber" },
      { num: 222, title: "Malagan display and mask", origin: "New Ireland Province, Papua New Guinea", date: "c. 20th century C.E.", materials: "Wood, pigment, fiber, shell" },
      { num: 223, title: "Presentation of Fijian mats and tapa cloths to Queen Elizabeth II", origin: "Fiji, Polynesia", date: "1953 C.E.", materials: "Multimedia performance" },
    ]
  },
  {
    id: 10,
    name: "Global Contemporary",
    period: "1980 C.E. to Present",
    color: "#2c3e50",
    works: [
      { num: 224, title: "The Gates", origin: "Christo and Jeanne-Claude", date: "1979–2005 C.E.", materials: "Mixed-media installation" },
      { num: 225, title: "Vietnam Veterans Memorial", origin: "Maya Lin", date: "1982 C.E.", materials: "Granite" },
      { num: 226, title: "Horn Players", origin: "Jean-Michel Basquiat", date: "1983 C.E.", materials: "Acrylic and oil paintstick on canvas" },
      { num: 227, title: "Summer Trees", origin: "Song Su-nam", date: "1983 C.E.", materials: "Ink on paper" },
      { num: 228, title: "Androgyn III", origin: "Magdalena Abakanowicz", date: "1985 C.E.", materials: "Burlap, resin, wood, nails, string" },
      { num: 229, title: "A Book from the Sky", origin: "Xu Bing", date: "1987–1991 C.E.", materials: "Mixed-media installation" },
      { num: 230, title: "Pink Panther", origin: "Jeff Koons", date: "1988 C.E.", materials: "Glazed porcelain" },
      { num: 231, title: "Untitled (#228), from the History Portraits series", origin: "Cindy Sherman", date: "1990 C.E.", materials: "Photograph" },
      { num: 232, title: "Dancing at the Louvre, from The French Collection", origin: "Faith Ringgold", date: "1991 C.E.", materials: "Acrylic on canvas, tie-dyed fabric border" },
      { num: 233, title: "Trade (Gifts for Trading Land with White People)", origin: "Jaune Quick-to-See Smith", date: "1992 C.E.", materials: "Oil and mixed media on canvas" },
      { num: 234, title: "Earth's Creation", origin: "Emily Kame Kngwarreye", date: "1994 C.E.", materials: "Synthetic polymer paint on canvas" },
      { num: 235, title: "Rebellious Silence, from the Women of Allah series", origin: "Shirin Neshat", date: "1994 C.E.", materials: "Ink on photograph" },
      { num: 236, title: "En la Barberia no se Llora (No Crying Allowed in the Barbershop)", origin: "Pepon Osorio", date: "1994 C.E.", materials: "Mixed-media installation" },
      { num: 237, title: "Pisupo Lua Afe (Corned Beef 2000)", origin: "Michel Tuffery", date: "1994 C.E.", materials: "Mixed media" },
      { num: 238, title: "Electronic Superhighway", origin: "Nam June Paik", date: "1995 C.E.", materials: "Mixed-media installation (49-channel video, neon, steel)" },
      { num: 239, title: "The Crossing", origin: "Bill Viola", date: "1996 C.E.", materials: "Video/sound installation" },
      { num: 240, title: "Guggenheim Museum Bilbao", origin: "Frank Gehry", date: "1997 C.E.", materials: "Titanium, glass, and limestone" },
      { num: 241, title: "Pure Land", origin: "Mariko Mori", date: "1998 C.E.", materials: "Color photograph on glass" },
      { num: 242, title: "Lying with the Wolf", origin: "Kiki Smith", date: "2001 C.E.", materials: "Ink and pencil on paper" },
      { num: 243, title: "Darkytown Rebellion", origin: "Kara Walker", date: "2001 C.E.", materials: "Cut paper and projection on wall" },
      { num: 244, title: "The Swing (after Fragonard)", origin: "Yinka Shonibare", date: "2001 C.E.", materials: "Mixed-media installation" },
      { num: 245, title: "Old Man's Cloth", origin: "El Anatsui", date: "2003 C.E.", materials: "Aluminum and copper wire" },
      { num: 246, title: "Stadia II", origin: "Julie Mehretu", date: "2004 C.E.", materials: "Ink and acrylic on canvas" },
      { num: 247, title: "Preying Mantra", origin: "Wangechi Mutu", date: "2006 C.E.", materials: "Mixed media on Mylar" },
      { num: 248, title: "Shibboleth", origin: "Doris Salcedo", date: "2007–2008 C.E.", materials: "Installation" },
      { num: 249, title: "MAXXI National Museum of XXI Century Arts", origin: "Zaha Hadid", date: "2009 C.E.", materials: "Glass, steel, and cement" },
      { num: 250, title: "Kui Hua Zi (Sunflower Seeds)", origin: "Ai Weiwei", date: "2010–2011 C.E.", materials: "Sculpted and painted porcelain" },
    ]
  }
];

/* ─── Typewriter with mid-text pauses ─── */
function useTypewriterWithPauses(text, speed = 35, startDelay = 0, enabled = true, pauseMap = {}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    setDisplayed(""); setDone(false);
    let i = 0; let cancelled = false;
    const advance = () => {
      if (cancelled) return;
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { setDone(true); return; }
      const pauseDuration = pauseMap[i];
      if (pauseDuration) {
        setTimeout(advance, pauseDuration);
      } else {
        setTimeout(advance, speed);
      }
    };
    const delayTimer = setTimeout(advance, startDelay);
    return () => { cancelled = true; clearTimeout(delayTimer); };
  }, [text, speed, startDelay, enabled]);
  return { displayed, done };
}

/* ─── Intro Sequence ─── */
function IntroSequence({ onComplete }) {
  const title = "Two hundred and fifty works. One quest.";
  // "works." ends at index 28 — pause 2s after that character
  const titlePauseMap = { 28: 2400 };
  const subtitle = "A comprehensive log of every required work across all 10 content areas, from Global Prehistory through Global Contemporary.";

  const { displayed: titleText, done: titleDone } = useTypewriterWithPauses(title, 45, 1000, true, titlePauseMap);
  const { displayed: subText, done: subDone } = useTypewriterWithPauses(subtitle, 45, 3000, titleDone, {});
  const [fading, setFading] = useState(false);

  useEffect(() => { if (subDone) { const t = setTimeout(() => setFading(true), 3000); return () => clearTimeout(t); } }, [subDone]);
  useEffect(() => { if (fading) { const t = setTimeout(() => onComplete(), 1000); return () => clearTimeout(t); } }, [fading, onComplete]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: 40, opacity: fading ? 0 : 1, transition: "opacity 1s ease" }}>
      <h1 style={{ fontSize: 42, fontWeight: 700, color: "#1a1a1a", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.3, textAlign: "center", maxWidth: 1000, minHeight: 55, fontFamily: "'Source Serif 4', Georgia, serif" }}>
        {titleText}
        {!titleDone && <span style={{ display: "inline-block", width: 3, height: "1em", background: "#1a1a1a", marginLeft: 2, verticalAlign: "text-bottom", animation: "cursorBlink 0.8s step-end infinite" }} />}
      </h1>
      {titleDone && (
        <p style={{ fontSize: 15, color: "#888", marginTop: 20, maxWidth: 2000, lineHeight: 1.7, fontWeight: 400, textAlign: "center", fontFamily: "'Source Serif 4', Georgia, serif", minHeight: 50 }}>
          {subText}
          {!subDone && <span style={{ display: "inline-block", width: 2, height: "0.9em", background: "#888", marginLeft: 1, verticalAlign: "text-bottom", animation: "cursorBlink 0.8s step-end infinite" }} />}
        </p>
      )}
    </div>
  );
}

/* ─── Toggle, Globe, Collapsible, ListView — unchanged ─── */
function ViewToggle({ activeView, onToggle }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", background: "#e8e5dd", borderRadius: 8, padding: 3, gap: 2 }}>
      {["globe", "list"].map((view) => (
        <button key={view} onClick={() => onToggle(view)} style={{
          padding: "7px 18px", border: "none", borderRadius: 6, fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 600,
          cursor: "pointer", transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          background: activeView === view ? "#fff" : "transparent", color: activeView === view ? "#1a1a1a" : "#999",
          boxShadow: activeView === view ? "0 1px 3px rgba(0,0,0,0.1)" : "none", textTransform: "capitalize", letterSpacing: "0.04em",
        }}>{view === "list" ? "☰ List" : "◉ Globe"}</button>
      ))}
    </div>
  );
}

function GlobeView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16, animation: "contentFadeIn 0.5s ease forwards" }}>
      <div style={{ width: 160, height: 160, borderRadius: "50%", border: "2px dashed #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, color: "#ddd" }}>◉</div>
      <p style={{ fontSize: 15, color: "#aaa", fontFamily: "'DM Mono', monospace", textAlign: "center", maxWidth: 400, lineHeight: 1.6 }}>Globe view coming soon.<br />An orthographic view of Earth with all visited works plotted.</p>
    </div>
  );
}

function CollapsibleSection({ area, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => { if (contentRef.current) setHeight(contentRef.current.scrollHeight); }, [isOpen]);
  const accentLight = area.color + "18", accentMed = area.color + "30";
  return (
    <div style={{ marginBottom: 2, opacity: 0, animation: `fadeSlideIn 0.5s ease ${index * 0.04}s forwards` }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: isOpen ? accentMed : accentLight, border: "none", borderLeft: `4px solid ${area.color}`, cursor: "pointer", transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)", fontFamily: "'Source Serif 4', Georgia, serif" }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = accentMed; }} onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = accentLight; }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: area.color, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{area.id}</span>
        <div style={{ flex: 1, textAlign: "left" }}>
          <span style={{ fontSize: 17, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.01em" }}>{area.name}</span>
          <span style={{ fontSize: 13, color: "#777", marginLeft: 12, fontFamily: "'DM Mono', monospace", fontWeight: 400 }}>{area.period}</span>
        </div>
        <span style={{ fontSize: 12, color: "#999", fontFamily: "'DM Mono', monospace", marginRight: 8 }}>{area.works.length} works</span>
        <span style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: 18, color: area.color, lineHeight: 1 }}>▾</span>
      </button>
      <div style={{ overflow: "hidden", transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease", maxHeight: isOpen ? height + 20 : 0, opacity: isOpen ? 1 : 0 }}>
        <div ref={contentRef}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <thead><tr style={{ background: "#f8f7f4", borderBottom: "2px solid #e8e5dd" }}>
              <th style={{ ...thStyle, width: 52 }}>#</th><th style={{ ...thStyle, textAlign: "left" }}>Title</th><th style={{ ...thStyle, textAlign: "left", width: "22%" }}>Origin / Artist</th><th style={{ ...thStyle, textAlign: "left", width: "16%" }}>Date</th><th style={{ ...thStyle, textAlign: "left", width: "20%" }}>Materials</th>
            </tr></thead>
            <tbody>{area.works.map((work, wi) => (
              <tr key={work.num} style={{ borderBottom: "1px solid #eee", transition: "background 0.2s ease", animation: isOpen ? `rowFadeIn 0.3s ease ${wi * 0.02}s both` : "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#faf9f6")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ ...tdStyle, textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: 12, color: area.color, fontWeight: 600 }}>{work.num}</td>
                <td style={{ ...tdStyle, fontWeight: 500, color: "#1a1a1a", fontSize: 14 }}>{work.title}</td>
                <td style={{ ...tdStyle, color: "#555", fontSize: 13 }}>{work.origin}</td>
                <td style={{ ...tdStyle, color: "#777", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{work.date}</td>
                <td style={{ ...tdStyle, color: "#888", fontSize: 12 }}>{work.materials}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = { padding: "10px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", fontFamily: "'DM Mono', monospace" };
const tdStyle = { padding: "10px 12px", verticalAlign: "top", lineHeight: 1.45 };

function ListView({ searchTerm, setSearchTerm, openSections, setOpenSections, expandAll, collapseAll }) {
  const filteredAreas = searchTerm.trim()
    ? CONTENT_AREAS.map((a) => ({ ...a, works: a.works.filter((w) => w.title.toLowerCase().includes(searchTerm.toLowerCase()) || w.origin.toLowerCase().includes(searchTerm.toLowerCase()) || w.materials.toLowerCase().includes(searchTerm.toLowerCase()) || w.num.toString() === searchTerm.trim()) })).filter((a) => a.works.length > 0)
    : CONTENT_AREAS;
  const totalShown = filteredAreas.reduce((s, a) => s + a.works.length, 0);
  const toggleSection = (id) => { setOpenSections((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; }); };
  return (
    <div style={{ animation: "contentFadeIn 0.5s ease forwards" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#bbb", fontSize: 23, pointerEvents: "none" }}>⌕</span>
          <input type="text" placeholder="Search by title, artist, origin, material, or number..." value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); if (e.target.value.trim()) expandAll(); }}
            style={{ width: "100%", padding: "11px 16px 11px 38px", border: "1.5px solid #ddd", borderRadius: 8, fontSize: 14, fontFamily: "'Source Serif 4', Georgia, serif", background: "#fff", outline: "none", transition: "border-color 0.2s ease", color: "#333" }}
            onFocus={(e) => (e.target.style.borderColor = "#999")} onBlur={(e) => (e.target.style.borderColor = "#ddd")} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={expandAll} style={pillBtnStyle} onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e5dd")} onMouseLeave={(e) => (e.currentTarget.style.background = "#f0ede6")}>Expand All</button>
          <button onClick={collapseAll} style={pillBtnStyle} onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e5dd")} onMouseLeave={(e) => (e.currentTarget.style.background = "#f0ede6")}>Collapse All</button>
        </div>
        <span style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Mono', monospace" }}>{totalShown} of 250 works</span>
      </div>
      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 60px" }}>
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)" }}>
          {filteredAreas.map((area, i) => (<CollapsibleSection key={area.id} area={area} isOpen={openSections.has(area.id)} onToggle={() => toggleSection(area.id)} index={i} />))}
          {filteredAreas.length === 0 && <div style={{ padding: 48, textAlign: "center", color: "#aaa", fontSize: 15 }}>No works found matching "{searchTerm}"</div>}
        </div>
      </main>
    </div>
  );
}

export default function APArtHistory250() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeView, setActiveView] = useState("globe");
  const [openSections, setOpenSections] = useState(new Set([1]));
  const [searchTerm, setSearchTerm] = useState("");
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const expandAll = () => { setOpenSections(new Set(CONTENT_AREAS.map((a) => a.id))); };
  const collapseAll = () => { setOpenSections(new Set()); };
  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ee", fontFamily: "'Source Serif 4', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600;8..60,700&family=DM+Mono:wght@300;400;500&display=swap');
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes rowFadeIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes contentFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes headerFadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        input::placeholder { color: #bbb; font-style: italic; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
      `}</style>
      {!introComplete ? (
        <IntroSequence onComplete={handleIntroComplete} />
      ) : (
        <>
          <header style={{ padding: "20px 40px", maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", animation: "headerFadeIn 0.6s ease forwards" }}>
            <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.15em", color: "#999" }}>Rohil J Dave · AP Art History · Class of 2020</div>
            <ViewToggle activeView={activeView} onToggle={setActiveView} />
          </header>
          {activeView === "list" ? (
            <ListView searchTerm={searchTerm} setSearchTerm={setSearchTerm} openSections={openSections} setOpenSections={setOpenSections} expandAll={expandAll} collapseAll={collapseAll} />
          ) : (
            <GlobeView />
          )}
          <footer style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 40px", textAlign: "center" }}>
            <p style={{ fontSize: 11, color: "#bbb", fontFamily: "'DM Mono', monospace" }}>Source: College Board AP Art History Course and Exam Description, Appendix A. Based on the 2019-2020 curriculum, the year I took the course and exam. Enjoy the journey.</p>
          </footer>
        </>
      )}
    </div>
  );
}

const pillBtnStyle = { 
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  background: "#f0ede6",
  color: "#666",
  fontSize: 12,
  fontFamily: "'DM Mono', monospace",
  cursor: "pointer",
  transition: "background 0.2s ease",
  fontWeight: 500 
};