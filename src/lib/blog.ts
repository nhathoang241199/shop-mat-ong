export const BLOG_CATEGORIES = ["Tất cả", "Kiến thức", "Sức khoẻ", "Câu chuyện", "Công thức"] as const;

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  readTime: number;
  publishedAt: string | Date;
};

export function formatBlogDate(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("vi-VN");
}

export function renderBlogContent(content: string) {
  const lines = content.split("\n");
  const elements: { type: "h3" | "p" | "spacer"; text?: string; key: number }[] = [];
  let key = 0;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      elements.push({ type: "h3", text: line.replace("## ", ""), key: key++ });
    } else if (line.trim() === "") {
      elements.push({ type: "spacer", key: key++ });
    } else {
      elements.push({ type: "p", text: line, key: key++ });
    }
  }
  return elements;
}

export const SAMPLE_POSTS = [
  {
    title: "Cách phân biệt mật ong thật và mật ong giả",
    slug: "phan-biet-mat-ong-that-gia",
    excerpt:
      "Thị trường mật ong ngày càng xuất hiện nhiều hàng giả. Dưới đây là những cách đơn giản giúp bạn nhận biết mật ong nguyên chất tại nhà.",
    content: `Mật ong nguyên chất là một trong những thực phẩm quý giá nhất từ thiên nhiên. Tuy nhiên, không phải ai cũng biết cách phân biệt mật ong thật và giả.

## 1. Thử nghiệm với nước

Nhỏ một giọt mật ong vào ly nước lạnh. Mật ong thật sẽ chìm xuống đáy và không tan ngay, trong khi mật ong giả sẽ tan nhanh và làm đục nước.

## 2. Kiểm tra độ nhớt

Mật ong thật có độ nhớt cao, khi đổ từ thìa xuống sẽ tạo thành sợi liên tục và không bị đứt đoạn. Mật ong pha đường thường loãng hơn và chảy nhanh.

## 3. Quan sát màu sắc và mùi hương

Mật ong nguyên chất có màu sắc tự nhiên tùy theo loại hoa — từ vàng nhạt đến nâu đậm. Mùi thơm đặc trưng của từng loại hoa không pha lẫn mùi nhân tạo.

## 4. Thử với giấy thấm

Nhỏ một giọt mật ong lên giấy thấm. Mật ong thật sẽ không làm ướt giấy vì hàm lượng nước thấp. Mật ong pha nước sẽ thấm vào giấy nhanh chóng.

## 5. Kết tinh tự nhiên

Mật ong thật thường kết tinh sau một thời gian bảo quản — đây là dấu hiệu tốt, không phải hỏng. Mật ong giả thường không kết tinh hoặc kết tinh không đều.

Tại Mật Ong Phan Thiết, chúng tôi cam kết 100% mật ong nguyên chất, không pha trộn, thu hoạch trực tiếp từ tổ ong tại vùng rừng tràm và vườn thanh long Bình Thuận.`,
    category: "Kiến thức",
    author: "Nguyễn Văn Minh",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=480&fit=crop&auto=format",
    readTime: 4,
    publishedAt: new Date("2026-09-05T08:00:00Z"),
  },
  {
    title: "Lợi ích của mật ong hoa thanh long với sức khoẻ",
    slug: "loi-ich-mat-ong-hoa-thanh-long",
    excerpt:
      "Mật ong hoa thanh long — đặc sản độc quyền của vùng Bình Thuận — không chỉ có hương vị thanh mát mà còn mang lại nhiều lợi ích sức khoẻ đáng chú ý.",
    content: `Thanh long là cây trồng chủ lực của Bình Thuận, và mật ong thu hoạch từ hoa thanh long là sản phẩm đặc biệt chỉ có tại vùng đất này.

## Thành phần dinh dưỡng nổi bật

Mật ong hoa thanh long chứa hàm lượng fructose và glucose tự nhiên cao, cùng với các enzyme, vitamin B và khoáng chất thiết yếu. Hàm lượng chất chống oxy hoá trong loại mật này được đánh giá cao hơn nhiều so với mật ong thông thường.

## Tăng cường miễn dịch

Các hợp chất flavonoid và phenolic trong mật ong hoa thanh long có tác dụng kháng khuẩn, kháng viêm mạnh. Uống một thìa mỗi sáng giúp cơ thể chống lại các tác nhân gây bệnh.

## Hỗ trợ tiêu hoá

Enzyme tự nhiên trong mật ong — đặc biệt là amylase và invertase — hỗ trợ phân giải thức ăn và cân bằng hệ vi sinh đường ruột.

## Dưỡng da từ bên trong

Hàm lượng chất chống oxy hoá cao giúp làm chậm quá trình lão hoá, cải thiện độ đàn hồi da khi dùng đều đặn.

## Cách dùng hiệu quả

Pha 1-2 thìa mật ong với nước ấm (không quá 40°C để giữ nguyên enzyme) uống buổi sáng lúc đói. Hoặc dùng thay thế đường trong các món tráng miệng, trà và nước ép.`,
    category: "Sức khoẻ",
    author: "Trần Thị Hoa",
    image: "https://images.unsplash.com/photo-1536788567643-8c2368376526?w=800&h=480&fit=crop&auto=format",
    readTime: 5,
    publishedAt: new Date("2026-09-02T08:00:00Z"),
  },
  {
    title: "Mùa thu hoạch mật ong rừng tràm tại Phan Thiết",
    slug: "mua-thu-hoach-mat-ong-rung-tram",
    excerpt:
      "Mỗi năm hai lần, vào tháng 3 và tháng 9, những người nuôi ong tại Phan Thiết lại bắt đầu mùa thu hoạch mật từ rừng tràm ven biển Bình Thuận.",
    content: `Rừng tràm ven biển Phan Thiết trải dài hàng chục kilômét là nơi lý tưởng cho đàn ong phát triển và tạo ra loại mật đặc biệt nhất vùng.

## Thời điểm thu hoạch

Tràm nở hoa hai lần trong năm — vào tháng 2-3 (mùa xuân) và tháng 8-9 (đầu thu). Đây là hai mùa thu hoạch chính, khi mật trong tổ đã đạt đủ độ chín và hàm lượng nước xuống dưới 20%.

## Quy trình thu mật

Người nuôi ong mặc bộ bảo hộ đầy đủ, dùng khói để làm ong lắng xuống trước khi lấy khung bánh tổ ra. Mật được quay ly tâm ngay tại chỗ để đảm bảo độ tươi, không qua nhiệt hay lọc thô.

## Tiêu chuẩn chất lượng

Chúng tôi chỉ thu hoạch khi mật đã được ong đóng nắp sáp — đây là dấu hiệu mật đã chín hoàn toàn. Độ ẩm luôn duy trì dưới 18%, đảm bảo mật không lên men và giữ được lâu tự nhiên.

## Sản lượng mỗi mùa

Mỗi đàn ong khoẻ mạnh cho khoảng 15-20 kg mật mỗi mùa. Với 200 đàn ong hiện có, chúng tôi thu hoạch khoảng 3-4 tấn mật mỗi năm — đủ cung cấp cho khách hàng trên toàn quốc mà không cần pha trộn.`,
    category: "Câu chuyện",
    author: "Nguyễn Văn Minh",
    image: "https://images.unsplash.com/photo-1758522965216-7e283754e784?w=800&h=480&fit=crop&auto=format",
    readTime: 6,
    publishedAt: new Date("2026-08-28T08:00:00Z"),
  },
  {
    title: "Uống mật ong đúng cách: 5 lưu ý bạn cần biết",
    slug: "uong-mat-ong-dung-cach",
    excerpt:
      "Mật ong tốt nhưng dùng sai cách sẽ làm mất enzyme và giảm hiệu quả. Đây là những nguyên tắc đơn giản để tận dụng tối đa dưỡng chất.",
    content: `Nhiều người uống mật ong mỗi ngày nhưng chưa chắc đã hấp thụ hết lợi ích vì nhiệt độ và thời điểm dùng không phù hợp.

## Không dùng nước quá nóng

Enzyme trong mật ong bị phá hủy khi nhiệt độ vượt quá 40–45°C. Hãy pha với nước ấm, không dùng nước sôi trực tiếp.

## Uống lúc đói buổi sáng

Buổi sáng lúc bụng đói giúp cơ thể hấp thụ đường tự nhiên và khoáng chất nhanh hơn, đồng thời kích thích tiêu hoá nhẹ nhàng.

## Liều lượng vừa phải

Người lớn nên dùng khoảng 1–2 thìa cà phê mỗi lần, 1–2 lần/ngày. Trẻ nhỏ trên 1 tuổi dùng lượng nhỏ hơn; trẻ dưới 1 tuổi không nên dùng mật ong.

## Kết hợp đúng thực phẩm

Mật ong hợp với chanh, gừng, sữa chua hoặc ngũ cốc. Tránh pha với đồ uống có gas hoặc rượu mạnh.

## Bảo quản đúng chỗ

Giữ hũ mật ở nơi khô ráo, tránh ánh nắng trực tiếp. Không để trong tủ lạnh nếu muốn giữ độ sánh tự nhiên; kết tinh là hiện tượng bình thường.`,
    category: "Kiến thức",
    author: "Lê Thu Hà",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&h=480&fit=crop&auto=format",
    readTime: 4,
    publishedAt: new Date("2026-08-20T08:00:00Z"),
  },
  {
    title: "Mật ong và nghệ: công thức vàng cho miễn dịch",
    slug: "mat-ong-va-nghe-cong-thuc-mien-dich",
    excerpt:
      "Kết hợp mật ong nguyên chất với nghệ tươi hữu cơ tạo ra thức uống kháng viêm quen thuộc trong gia đình Việt.",
    content: `Curcumin trong nghệ và enzyme kháng khuẩn trong mật ong bổ trợ lẫn nhau, tạo nên công thức đơn giản nhưng hiệu quả.

## Nguyên liệu

1 thìa mật ong rừng tràm, 1/2 củ nghệ tươi nhỏ (hoặc 1/2 thìa bột nghệ), 200ml nước ấm, vài lát chanh (tuỳ chọn).

## Cách làm

Gọt nghệ, nghiền nhuyễn rồi lọc lấy nước. Pha với nước ấm, để nguội còn ấm rồi mới khuấy mật ong. Thêm chanh nếu muốn vị thanh.

## Khi nào nên dùng

Buổi sáng hoặc khi bắt đầu cảm lạnh nhẹ. Không thay thế thuốc điều trị khi đã sốt cao hoặc bệnh nặng — hãy gặp bác sĩ.

## Lưu ý

Người đang dùng thuốc chống đông hoặc có vấn đề mật nên hỏi ý kiến chuyên gia trước khi dùng nghệ thường xuyên.`,
    category: "Công thức",
    author: "Trần Thị Hoa",
    image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=800&h=480&fit=crop&auto=format",
    readTime: 3,
    publishedAt: new Date("2026-08-12T08:00:00Z"),
  },
  {
    title: "Vì sao mật ong hoa cà phê có hương vị đặc trưng?",
    slug: "mat-ong-hoa-ca-phe-huong-vi",
    excerpt:
      "Vùng điều và cà phê Bình Thuận tạo ra loại mật sánh, thơm nhẹ vị hoa cà phê — khác hẳn mật rừng tràm thanh mát.",
    content: `Mỗi loại mật phản ánh hệ thực vật nơi ong lấy phấn. Hoa cà phê cho mật có màu hổ phách và hậu vị ấm.

## Nguồn gốc thực vật

Khi cà phê nở rộ, đàn ong thu phấn trong bán kính vài kilômét quanh vườn. Nectar hoa cà phê chứa đường và hợp chất thơm riêng.

## Đặc điểm cảm quan

Mật ong hoa cà phê thường sánh hơn, màu đậm hơn mật hoa thanh long, mùi thoảng hương hoa và vị ngọt sâu.

## Dùng trong ẩm thực

Hợp để pha sữa nóng (để nguội còn ấm), làm sốt salad, hoặc phết bánh mì nguyên cám. Không cần thêm đường khác.

## Cách chọn mua

Ưu tiên hũ ghi rõ nguồn hoa, ngày thu hoạch và nơi nuôi ong. Tránh sản phẩm quá rẻ hoặc không có thông tin truy xuất.`,
    category: "Kiến thức",
    author: "Nguyễn Văn Minh",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=480&fit=crop&auto=format",
    readTime: 4,
    publishedAt: new Date("2026-08-05T08:00:00Z"),
  },
  {
    title: "15 năm nuôi ong ven biển: câu chuyện gia đình chúng tôi",
    slug: "15-nam-nuoi-ong-ven-bien",
    excerpt:
      "Từ vài đàn ong năm 2008 đến hơn 200 đàn hôm nay — hành trình giữ nghề và giữ chữ tín với khách hàng trên cả nước.",
    content: `Gia đình chúng tôi bắt đầu với vài tổ ong nhỏ ven rừng tràm. Lúc đó chỉ bán cho hàng xóm và chợ địa phương.

## Khởi đầu gian nan

Mùa mưa bão làm mất đàn, mật mất mùa. Chúng tôi học cách đặt thùng đúng hướng gió và giữ khoảng cách an toàn với khu dân cư.

## Chọn không pha trộn

Có lời đề nghị mua mật giá cao để pha lại bán. Chúng tôi từ chối — giữ thương hiệu bằng mật nguyên chất dù sản lượng khiêm tốn hơn.

## Đến với khách toàn quốc

Từ khi đóng gói chuẩn và bán online, mật Phan Thiết đến được Hà Nội, Đà Nẵng, TP.HCM. Mỗi hũ vẫn gắn với mùa thu hoạch cụ thể.

## Điều chúng tôi tự hào nhất

Khách quay lại mua nhiều năm. Đó là thước đo rõ nhất cho chất lượng và sự trung thực.`,
    category: "Câu chuyện",
    author: "Nguyễn Văn Minh",
    image: "https://images.unsplash.com/photo-1758522965377-d61df18c7914?w=800&h=480&fit=crop&auto=format",
    readTime: 5,
    publishedAt: new Date("2026-07-28T08:00:00Z"),
  },
  {
    title: "Mặt nạ mật ong dưỡng ẩm cho da khô",
    slug: "mat-na-mat-ong-duong-am",
    excerpt:
      "Chỉ cần mật ong nguyên chất và vài nguyên liệu nhà bếp là có mặt nạ cấp ẩm dịu nhẹ cho da vào mùa hanh.",
    content: `Mật ong có tính giữ ẩm tự nhiên và kháng khuẩn nhẹ, phù hợp da khô hoặc da mệt mỏi sau nắng.

## Công thức cơ bản

2 thìa mật ong + 1 thìa sữa chua không đường. Trộn đều, thoa lên mặt sạch 10–15 phút, rửa lại bằng nước ấm.

## Biến tấu

Da dầu: thêm vài giọt nước cốt chanh. Da nhạy cảm: chỉ dùng mật ong loãng với nước ấm, thử vùng nhỏ trước.

## Lưu ý an toàn

Không dùng nếu dị ứng mật ong hoặc sản phẩm ong. Tránh để mật dính mắt. Ngừng ngay nếu đỏ rát.

## Kết hợp lối sống

Uống đủ nước, hạn chế sữa tắm mạnh. Mặt nạ chỉ hỗ trợ — không thay kem dưỡng có SPF ban ngày.`,
    category: "Công thức",
    author: "Lê Thu Hà",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=480&fit=crop&auto=format",
    readTime: 3,
    publishedAt: new Date("2026-07-18T08:00:00Z"),
  },
  {
    title: "Mật ong giúp ngủ ngon hơn như thế nào?",
    slug: "mat-ong-giup-ngu-ngon",
    excerpt:
      "Một thìa mật ong trước giờ ngủ có thể hỗ trợ ổn định đường huyết nhẹ và thư giãn — nếu dùng đúng cách.",
    content: `Một số nghiên cứu và kinh nghiệm dân gian gợi ý mật ong buổi tối giúp giấc ngủ êm hơn, đặc biệt khi kết hợp với sữa ấm hoặc trà hoa cúc.

## Cơ chế đơn giản

Lượng đường tự nhiên nhỏ có thể hỗ trợ não sản xuất serotonin/melatonin trong điều kiện thích hợp, đồng thời tránh tụt đường huyết nhẹ lúc nửa đêm.

## Cách dùng gợi ý

1 thìa mật ong hoà nước ấm hoặc sữa ấm, uống trước ngủ 30–60 phút. Không ăn thêm đồ ngọt khác.

## Ai nên thận trọng

Người tiểu đường cần theo dõi đường huyết và hỏi bác sĩ. Trẻ dưới 1 tuổi tuyệt đối không dùng mật ong.

## Môi trường ngủ vẫn quan trọng hơn

Hạn chế màn hình, phòng tối và giờ ngủ cố định mang lại hiệu quả lớn hơn bất kỳ thức uống nào.`,
    category: "Sức khoẻ",
    author: "Trần Thị Hoa",
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=800&h=480&fit=crop&auto=format",
    readTime: 4,
    publishedAt: new Date("2026-07-08T08:00:00Z"),
  },
] as const;
