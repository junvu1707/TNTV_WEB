// ==========================================
// [BLOCK 2: RAW_EXAM_DATA & SEED KNOWLEDGE POOL]
// ==========================================
// Ngân hàng hạt giống phong phú tích hợp 8 chuyên đề chuẩn GDPT 2018 và 1000 câu ca dao/tục ngữ
const KNOWLEDGE_BASE = {
  // 1. Anh hùng dân tộc & Liệt sĩ thiếu niên
  heroes: [
    { name: "Hai Bà Trưng", feat: "Cưỡi voi đánh giặc Đông Hán trên sông Hát", year: "Năm 40", grade: 2 },
    { name: "Bà Triệu", feat: "Cưỡi voi trắng đánh giặc Ngô ở núi Nưa", year: "Năm 248", grade: 2 },
    { name: "Kim Đồng (Nông Văn Dền)", feat: "Người đội trưởng đầu tiên của Đội TNTP Hồ Chí Minh", place: "Nà Mạ, Cao Bằng", grade: 2 },
    { name: "Võ Thị Sáu", feat: "Nữ anh hùng miền Đất Đỏ, gắn với hoa lê-ki-ma", place: "Bà Rịa - Vũng Tàu", grade: 2 },
    { name: "Lê Văn Tám", feat: "Ngọn đuốc sống đốt kho xăng Thị Nghè", place: "Sài Gòn", grade: 2 },
    { name: "Đinh Bộ Lĩnh", feat: "Cờ lau tập trận ở động Hoa Lư, dẹp loạn 12 sứ quân", place: "Ninh Bình", grade: 3 },
    { name: "Ngô Quyền", feat: "Đóng cọc gỗ bịt sắt đánh tan quân Nam Hán trên sông Bạch Đằng", year: "Năm 938", grade: 3 },
    { name: "Lý Thường Kiệt", feat: "Phòng tuyến sông Như Nguyệt, tác giả bài thơ thần Nam quốc sơn hà", place: "Sông Cầu", grade: 3 },
    { name: "Trần Quốc Toản", feat: "Bóp nát quả cam tại bến Bình Than, thêu cờ sáu chữ vàng", flag: "Phá cường địch, báo hoàng ân", grade: 3 },
    { name: "Trần Hưng Đạo", feat: "Ba lần đại phá quân Nguyên Mông, tác giả Hịch tướng sĩ", place: "Vạn Kiếp", grade: 3 },
    { name: "Lý Công Uẩn (Lý Thái Tổ)", feat: "Dời đô từ Hoa Lư về Thăng Long năm 1010", text: "Chiếu dời đô", grade: 4 },
    { name: "Lê Lợi (Lê Thái Tổ)", feat: "Lãnh đạo khởi nghĩa Lam Sơn, sự tích trả gươm thần Rùa Vàng", place: "Hồ Hoàn Kiếm", grade: 4 },
    { name: "Quang Trung (Nguyễn Huệ)", feat: "Áo vải cờ đào, đại phá 29 vạn quân Thanh mùa xuân Kỷ Dậu", year: "Năm 1789", grade: 4 },
    { name: "Phan Đình Giót", feat: "Lấy thân mình lấp lỗ châu mai trong chiến dịch Điện Biên Phủ", year: "Năm 1954", grade: 4 },
    { name: "Tô Vĩnh Diện", feat: "Lấy thân chèn pháo trên đèo dốc Điện Biên Phủ", grade: 4 },
    { name: "Bế Văn Đàn", feat: "Lấy vai làm giá súng cho đồng đội bắn tỉa giặc", grade: 4 },
    { name: "Đại tướng Võ Nguyên Giáp", feat: "Vị Đại tướng đầu tiên, Tổng chỉ huy chiến dịch Điện Biên Phủ", title: "Anh Cả Quân đội", grade: 4 },
    { name: "Lý Tự Trọng", feat: "Người đoàn viên đầu tiên, tấm gương kiên trung với câu nói 'Con đường của thanh niên chỉ là con đường cách mạng'", quote: "Con đường của thanh niên chỉ là con đường cách mạng", grade: 4 },
    { name: "Nguyễn Viết Xuân", feat: "Anh hùng liệt sĩ pháo cao xạ với khẩu lệnh bất hủ 'Nhằm thẳng quân thù mà bắn!'", quote: "Nhằm thẳng quân thù mà bắn!", grade: 4 },
    { name: "La Văn Cầu", feat: "Nhờ đồng đội chặt cánh tay bị thương để tiếp tục ôm bộc phá đánh đồn", grade: 4 },
    { name: "10 cô gái Đồng Lộc", feat: "Tiểu đội nữ thanh niên xung phong hy sinh anh dũng san lấp hố bom", place: "Hà Tĩnh", grade: 5 }
  ],

  // 2. Danh nhân văn hóa, Trạng nguyên & Tác giả
  scholars: [
    { name: "Nguyễn Hiền", title: "Trạng nguyên nhỏ tuổi nhất Việt Nam (12 tuổi đời vua Trần Thái Tông)", grade: 3 },
    { name: "Mạc Đĩnh Chi", title: "Lưỡng quốc Trạng nguyên (Trạng nguyên Việt Nam và Trạng nguyên nhà Nguyên)", grade: 3 },
    { name: "Lương Thế Vinh", title: "Trạng Lường (nhà toán học tài ba, cân voi bằng thuyền)", grade: 3 },
    { name: "Nguyễn Khuyến", title: "Tam nguyên Yên Đổ (đỗ đầu cả 3 kỳ thi Hương, Hội, Đình)", grade: 3 },
    { name: "Chu Văn An", title: "Người thầy mẫu mực muôn đời, dâng Thất trảm sớ", place: "Văn Miếu Quốc Tử Giám", grade: 4 },
    { name: "Nguyễn Trãi", title: "Danh nhân văn hóa thế giới, tác giả Bình Ngô đại cáo", grade: 4 },
    { name: "Nguyễn Bỉnh Khiêm", title: "Trạng Trình (nhà tiên tri, hiền triết đức độ)", grade: 4 },
    { name: "Lê Quý Đôn", title: "Nhà bác học lớn nhất thời phong kiến Việt Nam", grade: 4 },
    { name: "Nguyễn Du", title: "Đại thi hào dân tộc, tác giả Truyện Kiều", grade: 5 },
    { name: "Hồ Xuân Hương", title: "Bà chúa thơ Nôm", grade: 5 },
    { name: "Hải Thượng Lãn Ông Lê Hữu Trác", title: "Đại danh y dân tộc, tác giả Hải Thượng y tông tâm lĩnh", grade: 5 },
    { name: "Tô Hoài", work: "Dế Mèn phiêu lưu ký", grade: 5 },
    { name: "Đoàn Giỏi", work: "Đất rừng phương Nam", grade: 5 },
    { name: "Trần Đăng Khoa", work: "Tập thơ Góc sân và khoảng trời, Hạt gạo làng ta", grade: 5 }
  ],

  // 3. Địa danh lịch sử & Di sản văn hóa UNESCO
  places: [
    { name: "Vịnh Hạ Long", province: "Quảng Ninh", type: "Di sản thiên nhiên thế giới" },
    { name: "Quần thể danh thắng Tràng An", province: "Ninh Bình", type: "Di sản hỗn hợp thế giới" },
    { name: "Quần thể di tích Cố đô Huế", province: "Thừa Thiên Huế", river: "Sông Hương", mountain: "Núi Ngự" },
    { name: "Hoàng thành Thăng Long", province: "Hà Nội", type: "Di sản văn hóa thế giới" },
    { name: "Vườn quốc gia Phong Nha - Kẻ Bàng", province: "Quảng Bình", type: "Di sản thiên nhiên thế giới" },
    { name: "Phố cổ Hội An & Thánh địa Mỹ Sơn", province: "Quảng Nam", type: "Di sản văn hóa thế giới" },
    { name: "Bến Nhà Rồng", city: "TP. Hồ Chí Minh", event: "Nơi Bác Hồ ra đi tìm đường cứu nước năm 1911" },
    { name: "Hang Pác Bó - Suối Lê-nin", province: "Cao Bằng", event: "Nơi Bác Hồ trở về Tổ quốc năm 1941" },
    { name: "Quần đảo Hoàng Sa & Trường Sa", title: "Biển đảo thiêng liêng của Tổ quốc Việt Nam" }
  ],

  // 4. Lễ hội & Làng nghề truyền thống
  festivals: [
    { name: "Giỗ Tổ Hùng Vương", date: "Mùng 10 tháng 3 Âm lịch", place: "Đền Hùng, Phú Thọ" },
    { name: "Hội Gióng", place: "Đền Phù Đổng (Gia Lâm) và Đền Sóc (Sóc Sơn, Hà Nội)" },
    { name: "Hội Lim", place: "Bắc Ninh", art: "Dân ca Quan họ Bắc Ninh" },
    { name: "Gốm Bát Tràng", province: "Gia Lâm, Hà Nội" },
    { name: "Tranh Đông Hồ", province: "Thuận Thành, Bắc Ninh" },
    { name: "Lụa Vạn Phúc", province: "Hà Đông, Hà Nội" }
  ],

  // 5. Kho câu đố con vật & đố chữ thiếu nhi Lớp 1, 2 và nâng cao Lớp 3, 4, 5
  riddles: [
    // Dành cho Lớp 1 & Lớp 2 (Câu đố con vật & đố đồ vật, sự vật quen thuộc, dễ)
    { poem: "Con gì mào đỏ<br>Gáy ó ó o<br>Báo sáng mọi nhà?", answer: "gà trống", explain: "Con gà trống gáy ó ó o báo thức.", grade: 1 },
    { poem: "Con gì kêu meo meo<br>Bắt chuột rất giỏi<br>Hay nằm sưởi nắng?", answer: "con mèo", explain: "Con mèo bắt chuột.", grade: 1 },
    { poem: "Con gì trung thành<br>Trông nhà cho chủ<br>Thấy người lạ sủa gâu gâu?", answer: "con chó", explain: "Con chó trông nhà.", grade: 1 },
    { poem: "Con gì tai dài<br>Lông trắng mắt đỏ<br>Rất thích ăn cà rốt?", answer: "con thỏ", explain: "Con thỏ ăn cà rốt.", grade: 1 },
    { poem: "Con gì ụt ịt<br>Bụng to nằm xó<br>Ăn no lại ngủ?", answer: "con lợn", explain: "Con lợn (con heo).", grade: 1 },
    { poem: "Con gì hai vây xòe<br>Bơi tung tăng trong bể nước?", answer: "con cá", explain: "Con cá bơi dưới nước.", grade: 1 },
    { poem: "Con gì bơi dưới ao<br>Kêu cạch cạch cạch<br>Dáng đi lạch bạch?", answer: "con vịt", explain: "Con vịt.", grade: 1 },
    { poem: "Con gì cổ dài thật dài<br>Ăn lá trên cao<br>Lông vàng đốm nâu?", answer: "hươu cao cổ", explain: "Hươu cao cổ.", grade: 2 },
    { poem: "Con gì chăm chỉ làm mật<br>Bay khắp vườn hoa tìm nhụy?", answer: "con ong", explain: "Con ong làm mật.", grade: 2 },
    { poem: "Con gì có vòi dài<br>Hai tai to như cái quạt<br>Giúp người kéo gỗ?", answer: "con voi", explain: "Con voi.", grade: 2 },
    { poem: "Cái gì giúp em tẩy sạch<br>Những vết chì viết sai?", answer: "cục tẩy", explain: "Cục tẩy (gôm).", grade: 1 },
    { poem: "Cái gì thẳng tắp<br>Giúp em kẻ đường thẳng vuông vắn?", answer: "thước kẻ", explain: "Thước kẻ.", grade: 1 },
    { poem: "Cái gì ruột đen thân gỗ<br>Giúp em viết chữ và vẽ tranh?", answer: "bút chì", explain: "Bút chì.", grade: 1 },

    // Dành cho Lớp 3, 4, 5 (Đố chữ & Phát triển ngôn ngữ)
    { poem: "Để nguyên giúp bác làm đồng<br>Thêm huyền ngắm ánh trăng trong đêm rằm.", original: "trâu", changed: "trầu", answer: "trâu", explain: "Để nguyên là 'trâu' (giúp bác nông dân làm ruộng), thêm huyền thành 'trầu'.", grade: 3 },
    { poem: "Để nguyên tên một loài hoa<br>Thêm huyền trải rộng bao la cánh đồng<br>Nặng vào ấm áp mùa đông.", original: "sen", changed: "sèn", answer: "sen", explain: "Để nguyên là hoa 'sen'.", grade: 3 },
    { poem: "Để nguyên vùng đất sáng ngời<br>Thêm huyền rực rỡ một trời mộng mơ<br>Thay sắc thành chữ trong thơ.", original: "sao", answer: "sao", explain: "Chữ để nguyên là 'sao' (ngôi sao).", grade: 3 },
    { poem: "Để nguyên quả ngọt đầu cành<br>Thêm huyền đốt lửa ấm lành nhà nông.", original: "cam", answer: "cam", explain: "Chữ để nguyên là quả 'cam'.", grade: 3 },
    { poem: "Để nguyên tên vị anh hùng<br>Bạch Đằng sóng cuộn lẫy lừng chiến công<br>Bỏ đầu thêm sắc ngọt nồng<br>Trái cây mùa hạ ấm lòng người xa.", original: "Quyền", answer: "Ngô Quyền", explain: "Gợi ý về người anh hùng Ngô Quyền.", grade: 4 }
  ],

  // 6. Kho tục ngữ, ca dao phân loại chuẩn theo khối lớp
  proverbs: [
    // Dành cho Lớp 1 & Lớp 2 (Câu ngắn, dễ nhớ, phổ biến)
    { text: "Ăn quả nhớ kẻ trồng [...].", mask: "cây", full: "Ăn quả nhớ kẻ trồng cây.", theme: "Lòng biết ơn", grade: 1 },
    { text: "Uống nước nhớ [...].", mask: "nguồn", full: "Uống nước nhớ nguồn.", theme: "Lòng biết ơn", grade: 1 },
    { text: "Lá lành đùm lá [...].", mask: "rách", full: "Lá lành đùm lá rách.", theme: "Đoàn kết", grade: 1 },
    { text: "Gần mực thì đen, gần [...] thì sáng.", mask: "đèn", full: "Gần mực thì đen, gần đèn thì sáng.", theme: "Học tập", grade: 1 },
    { text: "Trâu ơi ta bảo trâu này / Trâu ra ngoài ruộng trâu [...] với ta.", mask: "cày", full: "Trâu ra ngoài ruộng trâu cày với ta.", theme: "Nông nghiệp", grade: 1 },
    { text: "Thương người như thể thương [...].", mask: "thân", full: "Thương người như thể thương thân.", theme: "Nhân hậu", grade: 1 },
    { text: "Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong [...] chảy ra.", mask: "nguồn", full: "Công cha như núi Thái Sơn, Nghĩa mẹ như nước trong nguồn chảy ra.", theme: "Hiếu thảo", grade: 1 },
    { text: "Bầu ơi thương lấy bí cùng / Tuy rằng khác [...] nhưng chung một giàn.", mask: "giống", full: "Bầu ơi thương lấy bí cùng...", theme: "Tương thân tương ái", grade: 2 },
    { text: "Nhiễu điều phủ lấy giá gương / Người trong một nước phải [...] nhau cùng.", mask: "thương", full: "Người trong một nước phải thương nhau cùng.", theme: "Đoàn kết", grade: 2 },
    { text: "Một con ngựa đau cả tàu bỏ [...].", mask: "cỏ", full: "Một con ngựa đau cả tàu bỏ cỏ.", theme: "Đoàn kết", grade: 2 },
    { text: "Tháp Mười đẹp nhất bông [...] / Việt Nam đẹp nhất có tên Bác Hồ.", mask: "sen", full: "Tháp Mười đẹp nhất bông sen...", theme: "Ca ngợi Bác Hồ", grade: 2 },
    { text: "Anh em như thể tay [...] / Rách lành bọc lót, dở hay đỡ đần.", mask: "chân", full: "Anh em như thể tay chân...", theme: "Tình anh em", grade: 2 },

    // Dành cho Lớp 3, 4, 5
    { text: "Có chí thì nên, có công mài sắt có ngày nên [...].", mask: "kim", full: "Có công mài sắt có ngày nên kim.", theme: "Ý chí", grade: 3 },
    { text: "Đói cho sạch, rách cho [...].", mask: "thơm", full: "Đói cho sạch, rách cho thơm.", theme: "Phẩm chất", grade: 3 },
    { text: "Học thầy không tày học [...].", mask: "bạn", full: "Học thầy không tày học bạn.", theme: "Học tập", grade: 4 },
    { text: "Muốn sang thì bắc cầu kiều / Muốn con hay chữ thì [...] lấy thầy.", mask: "yêu", full: "Muốn con hay chữ thì yêu lấy thầy.", theme: "Tôn sư trọng đạo", grade: 4 },
    { text: "Tốt gỗ hơn tốt nước [...].", mask: "sơn", full: "Tốt gỗ hơn tốt nước sơn.", theme: "Thực chất", grade: 4 },
    { text: "Ăn trông nồi, ngồi trông [...].", mask: "hướng", full: "Ăn trông nồi, ngồi trông hướng.", theme: "Lễ phép", grade: 4 },
    { text: "Lửa thử vàng, gian nan thử [...].", mask: "sức", full: "Lửa thử vàng gian nan thử sức.", theme: "Ý chí", grade: 4 },
    { text: "Không thầy đố mày làm [...].", mask: "nên", full: "Không thầy đố mày làm nên.", theme: "Tôn sư", grade: 4 },
    { text: "Chân cứng đá [...].", mask: "mềm", full: "Chân cứng đá mềm.", theme: "Nghị lực", grade: 5 },
    { text: "Đồng Đăng có phố Kỳ Lừa / Có nàng Tô Thị, có chùa [...].", mask: "Tam Thanh", full: "Đồng Đăng có phố Kỳ Lừa...", theme: "Địa danh Lạng Sơn", grade: 4 },
    { text: "Đường vô xứ Nghệ quanh quanh / Non xanh nước biếc như tranh [...] đồ.", mask: "họa", full: "Non xanh nước biếc như tranh họa đồ.", theme: "Địa danh Nghệ An", grade: 4 },
    { text: "Gió đưa cành trúc la đà / Tiếng chuông Trấn Vũ, canh gà [...].", mask: "Thọ Xương", full: "Tiếng chuông Trấn Vũ, canh gà Thọ Xương.", theme: "Cảnh đẹp Thăng Long", grade: 3 },
    { text: "Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng [...].", mask: "ba", full: "Nhớ ngày Giỗ Tổ mùng mười tháng ba.", theme: "Giỗ Tổ Hùng Vương", grade: 3 }
  ]
};
