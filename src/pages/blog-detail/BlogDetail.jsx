import React from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.css'; 
import blog3Image from '../../assets/images/dress2.jpg';
import blog4Image from '../../assets/images/dress3.jpg';
import blog5Image from '../../assets/images/hoa.jpg';
import blog6Image from '../../assets/images/nen1.jpg';
import blog7Image from '../../assets/images/phale.jpg';
import blog8Image from '../../assets/images/bong.jpg';
import blog9Image from '../../assets/images/phimtruong.jpg';
import blog10Image from '../../assets/images/phimtruong1.jpg';
import blog11Image from '../../assets/images/phimtruong3.jpg';
import blog12Image from '../../assets/images/CanTho.jpg';
import blog13Image from '../../assets/images/wedding.jpg';
import blog14Image from '../../assets/images/yes3.jpg';
import blog15Image from '../../assets/images/STUDIO.png';
import blog16Image from '../../assets/images/yes5.jpg';
import blog17Image from '../../assets/images/yes6.jpg';
import blog18Image from '../../assets/images/gia1.jpg';
import blog19Image from '../../assets/images/gia2.jpg';
import blog20Image from '../../assets/images/gia3.jpg';
import blog21Image from '../../assets/images/chua1.jpg';
import blog22Image from '../../assets/images/chua2.jpg';
import blog23Image from '../../assets/images/chua3.jpg';
import blog24Image from '../../assets/images/chua4.jpg';
import blog25Image from '../../assets/images/chua5.jpg';
const blogs = [
  {
    id: 1,
    title: "Bí kíp cho màn cầu hôn lãng mạn để nàng phải SAY “YES”",
    content: `
    <p>Để có một buổi cầu hôn hoàn hảo, bạn cần chuẩn bị kỹ lưỡng từ trước. Dưới đây là một số bí kíp giúp bạn có một buổi cầu hôn thành công:
    
    <h3><strong>1. Một tinh thần tốt, phong thái sẵn sàng cho màn cầu hôn</strong></h3>
    Tiêu chí đầu tiên để màn cầu hôn diễn ra suôn sẻ là một tinh thần tốt và sự sẵn sàng. Khi ấy bạn sẽ tự tin hơn để đứng trước nàng, nói ra tâm tư,
    tấm lòng một cách thật rõ ràng, mạch lạc. Nàng sẽ cảm nhận được sự chân thành trong từng ánh mắt, lời nói và cử chỉ của bạn. Cảm nhận được sự an toàn khi bên bạn.</br> 
    </br>Lưu ý: bạn có thể ăn một mẩu chocolate nhỏ trước đó để giảm sự căng thẳng, hồi hộp nha!</br>
    <img src="${blog12Image}" alt="Không gian lãng mạn" class="blog-detail-small-image"/>
    
    <h3><strong>2. Chọn khoảng thời gian thích hợp</strong></h3>
    Khi đã có kế hoạch cầu hôn nàng, bạn cần dò xét tâm tư của nàng và lựa chọn thời gian thích hợp khi cô ấy đang trong giai đoạn không quá bận rộn hay gặp vấn đề về công việc, 
    chuyện gia đình. Đừng hấp tấp mà khiến màn cầu hôn phản tác dụng và nhận về kết quả không mong muốn.
    <img src="${blog13Image}" alt="Kế hoạch chi tiết" class="blog-detail-small-image"/></br>
    Đặc biệt, sẽ thật tuyệt nếu đó là khoảng thời gian cả hai bạn đều vui vẻ, hạnh phúc. Và một màn cầu hôn vào buổi tối mát mẻ, trong bầu không khí lãng mạn giữa những ánh nến
    lung linh thì chẳng cô nàng nào lại không bị “đốn gục” ngay lập tức đâu nha.
    <h3><strong>3. Tìm địa điểm cầu hôn phù hợp</strong></h3>
    Bạn có thể lựa chọn nơi lần đầu cả hai gặp nhau, lần đầu hẹn hò hoặc nhà hàng, quán cà phê, bãi biển, đỉnh núi, hoặc một điểm du lịch hai bạn đều muốn đi tới, đài phun nước, quảng trường hay một nơi lãng mạn gần nơi bạn sống. Những địa điểm lãng mạn, thông thoáng sẽ đem lại sự ấm áp và bất ngờ cho nàng.
    <img src="${blog14Image}" alt="Bất ngờ" class="blog-detail-small-image"/>
    Đừng quên vạch ra một kế hoạch chi tiết và nhờ bạn bè thân thiết cùng chuẩn bị để mọi chi tiết đều hoàn hảo nhé. Đặc biệt, sự bí mật đến phút cuối cùng là yếu tố chính giúp bạn ghi điểm tuyệt đối trong “phi vụ” này đó.
    
    <h3><strong>4. Chuẩn bị trang phục chỉnh chu</strong></h3>
    Chẳng cần quá cầu kỳ trong khâu này, tuy nhiên bộ cánh cần đảm bảo tính lịch sự, gọn gàng, phù hợp với dáng người và không gian địa điểm cầu hôn.</br> Hãy lưu ý cả yếu tố thoải mái nữa nhé, vì bạn chúng mình sẽ cần quỳ xuống trao nhẫn đấy!
      <img src="${blog15Image}" alt="Bất ngờ" class="blog-detail-small-image"/></br>

    <h3><strong>5. Chuẩn bị nhẫn cầu hôn</strong></h3>
    Nhẫn cầu hôn là biểu tượng cho sự nghiêm túc, trái tim chân thành của chàng trai dành cho người con gái mình yêu, muốn được nàng nguyện 
    ý bên mình mãi mãi. Hơn cả, đây còn là sự trân trọng, người con gái của mình xứng đáng được nhận những điều tốt đẹp nhất. 
     <img src="${blog16Image}" alt="Bất ngờ" class="blog-detail-small-image"/></br>
    Ở bước chuẩn bị nhẫn cầu hôn này chắc các chàng trai thường sẽ lúng túng đây. Thông thường nhẫn đính hôn thường có đa dạng mẫu mã, 
    kích thước và giá thành. Các chàng hãy tùy vào điều kiện kinh tế, sở thích mà tìm mua chiếc nhẫn phù hợp cho cô dâu của mình. 

    <h3><strong>6. Soạn trước lời cầu hôn ngọt ngào</strong></h3>
    Khi đã có nhẫn, có hoa thì lời cầu hôn là không thể thiếu được. Soạn trước những lời cần chia sẻ, một vài lời ngọt ngào có cánh
    để lấy lòng nàng nhưng cần tránh dài dòng. Kế đến hãy tập trước gương để tránh hôm ấy nói lan man, lạc đề khiến nàng khó chịu. 
    Tuy nhiên, thái độ chân thành của bạn vẫn sẽ là yếu tố quyết định để bạn ghi điểm tuyệt đối và nhận được lời say “Yes” từ nàng.
     <img src="${blog17Image}" alt="Bất ngờ" class="blog-detail-small-image"/></br>
    A-Z tin rằng, với tất cả tình yêu chân thành, thì dù kế hoạch cầu hôn của bạn có hoành tráng hay giản đơn thì sự chuẩn bị ấy vẫn sẽ được 
    sự đền đáp xứng đáng. Và bây giờ cùng nhau điểm qua một vài địa điểm hay ho cho buổi cầu hôn lãng mạn nha.</p>
  `,
  image: require('../../assets/images/blog1.jpg'),
},

  {
    id: 2,
    title: "A-Z - Cửa hàng váy cưới thiết kế theo dáng cô dâu Việt",
    content: `
      A-Z Studio là một trong những địa chỉ nổi bật trong lĩnh vực thiết kế váy cưới tại Sài Gòn. Với nhiều mẫu mã đa dạng và kiểu dáng phong phú, REN Bridal không chỉ mang đến cho cô dâu những bộ váy cưới đẹp mà còn phù hợp với xu hướng mới nhất trong năm 2024.</br>
      Trở thành nàng công chúa lộng lẫy nhất và khoác tay “người thương” tiến vào lễ đường chắc hẳn là mơ ước của rất nhiều cô gái. Thế nhưng để tìm được lễ phục ưng ý và “chuẩn gu” không phải chuyện đơn giản, nhất là khi có quá nhiều cửa hàng váy cưới cung cấp dịch vụ cưới hỏi. Nếu bạn đang loay hoay chưa tìm được địa chỉ thuê áo cưới nào ưng ý thì đừng bỏ qua A-Z Studio – cửa hàng váy cưới uy tín và chất lượng được thiết kế theo form dáng cô dâu Việt tại thành phố Hồ Chí Minh nhé!
      <h3><strong>1. Vậy nên chọn cửa hàng váy cưới A-Z?</strong></h3>
     Đa dạng mẫu mã, kiểu dáng, màu sắc</br>
     </br>A-Z Studio đã và đang là một trong những cửa hàng váy cưới may đo và cho thuê và bán váy cưới uy tín, chất lượng nhất tại Sài Gòn. Tất cả những mẫu váy cưới của chúng tôi đều được thiết kế chuẩn form dáng cô dâu Việt và được may thủ công 100% với từng đường kim mũi chỉ khéo léo, tinh xảo.</br> 
     </br>Cửa hàng váy cưới A-Z cung cấp nhiều dòng váy cho cô dâu thoải mái lựa chọn: dòng váy Premium, váy Luxury, Limited, Ruby, Basic, áo dài,… Mỗi dòng váy đều có nhiều kiểu dáng và màu sắc khác nhau, điển hình như váy đuôi cá, váy công chúa, váy chữ A,…. Đây là điểm mạnh lớn nhất của studio vì nó không chỉ phù hợp với xu hướng thời trang cưới 2024 mà còn giúp các nàng dâu tôn lên được vẻ đẹp ngoại hình cũng như phong cách cá nhân.
     <img src="${blog3Image}" alt="Bất ngờ" class="blog-detail-small-image"/>
     </br>
     Nhiều ưu đãi hấp dẫn</br>
</br>Tại A-Z, chúng tôi luôn cung cấp dịch vụ cưới tốt nhất kèm với các combo ưu đãi hấp dẫn mà các cặp đôi không nên bỏ lỡ, điển hình như combo thuê váy được tặng gói chụp phim trường hoặc phóng sự cưới.</br></br> 

Đội ngũ nhân lực giàu kinh nghiệm</br>
</br>Bắt đầu đi vào hoạt động từ năm 2016, A-Z đã chứng tỏ mình là cửa hàng váy cưới uy tín và chất lượng nhất nhờ sở hữu đội ngũ nhân viên giàu kinh nghiệm. Từ thợ nhiếp ảnh, nhân viên makeup, nhân viên thiết kế váy cưới cho đến bộ phận chăm sóc khách hàng, tất cả đều được đào tạo chuyên nghiệp, chắc chắn sẽ làm hài lòng mọi khách hàng khi lựa chọn A-Z.</br></br>

Tư vấn, hỗ trợ miễn phí</br>
</br>Với đội ngũ nhân viên tư vấn dày dặn kinh nghiệm và rất có tâm, cửa hàng váy cưới của chúng tôi sẽ giúp bạn chọn được chiếc váy cưới phù hợp, tôn dáng và “chuẩn gu” của cô dâu nhất. Bên cạnh đó, studio còn hỗ trợ các nàng dâu chỉnh sửa trang phục theo số đo cá nhân cũng như giữ váy và giao váy cưới tận nhà. Và tất nhiên, quá trình tư vấn là hoàn toàn miễn phí nên dâu rể hãy cứ an tâm nhé! 

      <h3><strong>2. Những dịch vụ do cửa hàng váy cưới A-Z cung cấp</strong></h3>
      Với mong muốn đem đến dịch vụ chất lượng nhất cho các cô dâu, A-Z đã thành lập 3 chi nhánh tại các khu vực Nam Bộ nhằm phục vụ tốt nhất cho khách hàng.</br>
      <p>A-Z cung cấp nhiều dịch vụ như:</p>
      <ul>
        <li>Chụp album cưới</li>
        <li>Tư vấn phong cách chụp ảnh cưới</li>
        <li>Quay phim/ chụp hình phóng sự ngày cưới</li> 
        <li>May váy cưới theo số đo và yêu cầu cá nhân của cô dâu.</li>
      </ul>
      <img src="${blog4Image}" alt="Bất ngờ" class="blog-detail-small-image"/>
      </br>
      Với nhiều năm kinh nghiệm trong lĩnh vực dịch vụ cưới hỏi, cửa hàng váy cưới A-Z Studio cam kết sẽ mang đến cho các cặp đôi trải nghiệm dịch vụ chất lượng nhất với chi phí phù hợp nhất. Hãy chia sẻ với chúng tôi về lễ cưới trong mơ của bạn, việc còn lại cứ để A-Z lo!
    `,
    image: require('../../assets/images/blog2.jpg'),
  },

  {
  id: 3,
  title: "Top 3 phim trường nội thành Sài Gòn đang hot hiện nay",
  content: `
    Hiện nay, có rất nhiều phim trường nội thành Sài Gòn ra đời để đáp ứng nhu cầu chụp ảnh cưới hiện đại của các cặp đôi. Dưới đây là 3 phim trường đang được ưa chuộng:
    
    <h3><strong>1. Phim trường L’amour</strong></h3>
    Được xây dựng vào năm 2014 phim trường L’amour được thiết kế đa dạng về phong cách, giúp các cặp đôi thực hiện album ảnh cưới theo nhiều phong cách khác nhau mà không lo nhàm chán.
        <img src="${blog9Image}" alt="Phim trường L’amour" class="blog-detail-small-image"/>
    Phim trường L’amour có diện tích rộng gần 6.000 mét vuông trải dài bên bờ sông Sài Gòn, mang đến một không gian tuyệt vời với nhiều bối cảnh độc đáo và hơn 100 góc chụp đa dạng, 
    giúp album cưới ngập tràn những khoảnh khắc lãng mạn đầy cảm xúc. Nổi bật nhất phải kể đến khu vực lâu đài Châu Âu cổ kính, vườn hoa hướng dương khổng lồ, hồ nước và cầu tàu lãng mạn mỗi chiều hoàng hôn buông.

    <h3><strong>3. Phim trường Long Island</strong></h3>
    Phim trường Long Island nổi tiếng là “Lâu đài châu Âu thu nhỏ” với quần thể kiến trúc đồ sộ, tòa lâu đài uy nghi mang những vẻ đẹp của trầm tích thời gian. Đây là nơi mang đến cho cặp đôi bộ ảnh đẹp lãng mạn mà không cần tốn kém quá nhiều cho những chuyến bay để thực hiện bộ ảnh cưới chuẩn quốc tế. Cô dâu chú rể chỉ mất hơn 30 phút di chuyển là có thể đến đây chiêm ngưỡng vẻ đẹp cổ kính tại nơi này.
    <img src="${blog10Image}" alt="Phim trường Long Island" class="blog-detail-small-image"/>
    Điểm cộng của Long Island được các cặp đôi yêu mến lựa chọn chính bởi không gian bên trong toà lâu đài. Đậm chất vintage, sang trọng và cổ điển là những vẻ đẹp mà các uyên ương muốn đến đây trải nghiệm trong bộ ảnh cưới của mình. Các cặp đôi tha hồ thoải mái tạo dáng để lưu lại khoảnh khắc hạnh phúc trăm năm tại “Lâu đài châu Âu thu nhỏ”.

    <h3><strong>2. Phim trường Endee – Garden</strong></h3>
    En-Dee Garden là một phim trường tọa lạc tại số 915/22 ĐH34, Phước Kiển, Nhà Bè, Hồ Chí Minh; chỉ cách khu đô thị Phú Mỹ Hưng khoảng 6km di chuyển. Với diện tích lên tới gần 1500 mét vuông, với nhiều bối cảnh được xây dựng và thiết kế tỉ mỉ, cẩn thận từng chi tiết và những gam màu nhỏ. Nơi đây hiện đang nhận được rất nhiều sự yêu thích của các cặp đôi chụp hình cưới.
    <img src="${blog11Image}" alt="Phim trường Rustic" class="blog-detail-small-image"/>
    Đến với En-Dee Garden, các bạn không những được chiêm ngưỡng một không gian rộng lớn và lộng lẫy, mà còn được đắm chìm vào các bối cảnh chụp hình cưới vừa nhẹ nhàng, vừa gần gũi với thiên nhiên. Với rất nhiều tiểu cảnh như vườn cây xanh mướt, điểm xuyết thêm những đoá hoa hồng rực rỡ sẽ mang tới cho các cặp uyên ương một album cưới đa dạng góc máy.
    
    
  `,
  image: require('../../assets/images/blog3.jpg'),
  },

  {
    id: 4,
    title: "Bảng giá chụp hình cưới phim trường Sài Gòn 2024 tại A-Z Studio",
    content: `
     Không chỉ chụp ảnh cưới studio theo concept Hàn Quốc được ưa chuộng tại Việt Nam mà chụp hình cưới phim trường Sài Gòn cũng được rất nhiều cặp đôi yêu thích không kém. Các phim trường được trang trí và xây dựng concept chụp ảnh theo nhiều phong cách khác nhau. Trong bài viết này, A-Z Studio sẽ cung cấp cho các cặp đôi thông tin cơ bản về bảng giá của gói chụp phim trường Sài Gòn, cùng theo dõi nhé!</br></br>
      
      <h3><strong>1.  Gói chụp hình cưới phim trường Sài Gòn</strong></h3>
      <li>Phim trường Sài Gòn Basic (16.000.000 VNĐ)</li>
        <img src="${blog18Image}" alt="Phim trường L’amour" class="blog-detail-small-image"/>
      <li>Phim trường Sài Gòn Luxury (21.000.000 VNĐ)</li> 
      <img src="${blog19Image}" alt="Phim trường L’amour" class="blog-detail-small-image"/>
      Đối với cả 2 gói chụp hình cưới phim trường Sài Gòn, dâu rể sẽ được hỗ trợ xe đưa rước đến tận nơi thực hiện bộ album. Concept chụp ảnh đã được ekip nhà A-Z setup hoàn tất, các bạn chỉ cần thay trang phục và makeup là đã có thể tiến hành chụp ảnh cưới rồi. 
      Đội ngũ ekip bao gồm photographer, makeup artist và nhân viên hỗ trợ đều sẽ đồng hành cùng bạn suốt ngày chụp để mang đến trải nghiệm dịch vụ tốt nhất dành cho dâu rể. Vậy nên đôi bạn cứ yên tâm và thoải mái tận hưởng chất lượng dịch vụ, việc còn lại cứ để A-Z lo!

      <h3><strong>2. Gói chụp hình cưới phim trường A-Z </strong></h3>
      <li>Phim trường REN Basic (15.000.000 VNĐ)</li>
       <img src="${blog20Image}" alt="Phim trường L’amour" class="blog-detail-small-image"/>

      <h3><strong>3. Top phim trường chụp hình cưới đẹp nhất Sài Gòn</strong></h3>
          Phim trường Long Island</br></br>
      Long Island có kiến trúc nguy nga với những bậc thang cao, các ô cửa vòm lớn, kết hợp cùng nội thất bên trong được đầu tư kỹ lưỡng từ trần nhà ốp gỗ, những cây đèn chùm lấp lánh. Đối với những cặp đôi đam mê sự lộng lẫy của những tòa lâu đài đẹp như cổ tích Châu Âu nhưng lại ngại đi xa thì phim trường Long Island là gợi ý tuyệt vời cho bộ ảnh pre-wedding của đôi bạn đấy.</br>

      </br>Phim trường Paris</br>
      </br>Bạn đã từng mơ về một nước Pháp xa xôi, xinh đẹp? Phim trường chụp hình cưới này như một Paris thu nhỏ giữa lòng Sài Gòn với diện tích gần 30.000m2 được dựng lên với hàng trăm bối cảnh độc đáo – tòa lâu đài cổ kính Châu Âu, ngôi nhà nhỏ giữa thảo nguyên, cánh đồng cỏ lau thơ mộng, nhà gỗ và ga tàu lửa xưa.</br> 

      </br>Phim trường Vũ Garden</br>
     </br> Chụp ảnh cưới với khu vườn thơ mộng, không gian xanh mát với hàng ngàn giống hoa cỏ là điểm đặc trưng chỉ có tại phim trường Vũ Garen. Lấy cảm hứng từ nước Ý xa xôi, mỗi tiểu cảnh nơi đây đều toát lên vẻ đẹp cổ kính Tây Âu, mang lại nét sinh động và nhiều góc chụp mới lạ cho các nhiếp ảnh gia thỏa sức sáng tạo.</br>

      </br>Phim trường Rustic</br>
     </br> Không quá xa hoa, cầu kỳ, Rustic là một trong những phim trường chụp hình cưới đẹp nhất mà cô dâu chú rể nên thử. Với những bối cảnh vô cùng tự nhiên, gần gũi nhưng vẫn đậm chất lãng mạn, đôi bạn có thể tận hưởng một không gian đa màu sắc với hàng trăm góc chụp khác nhau, tha hồ “thả dáng” để có những set ảnh cưới “độc-lạ”.</br>

      </br>Bài viết trên là những thông tin về bảng giá chụp hình cưới phim trường Sài Gòn mà A-Z Studio muốn chia sẻ đến các đôi dâu rể sắp cưới. Với mức chi phí hợp lý cùng chất lượng dịch vụ tốt, chụp ảnh cưới phim trường luôn là gói chụp được hàng trăm cặp đôi ưu tiên cho bộ album pre-wedding của mình. Theo dõi website và fanpage của REN để cập nhật những thông tin mới nhất nhé!
          `,
    image: require('../../assets/images/story.jpg'),
  },

  {
    id: 5,
    title: "4 phụ kiện trang trí tiệc cưới thường được lựa chọn",
    content: `
      Để đám cưới của bạn thêm phần đặc sắc, đừng bỏ lỡ những phụ kiện trang trí tiệc cưới. 
      Những phụ kiện trang trí sẽ làm không gian buổi tiệc trở nên trang trọng hơn. 
      Có rất nhiều phụ kiện trang trí tiệc cưới, dưới đây là 4 phụ kiện yêu thích mà bạn có thể tham khảo nhé!
      
      <h3><strong>1. Hoa – Phụ kiện trang trí tiệc cưới “Quốc dân”</strong></h3>
      Có thể nói, hoa là phụ kiện trang trí tiệc cưới không thể thiếu trong ngày cưới. 
      Hoa mang theo một vẻ đẹp nhẹ nhàng, lãng mạn, thuần khiết làm cho buổi tiệc trở nên trang trọng hơn.
      Có rất nhiều loại hoa, mỗi loài hoa lại mang đến một màu sắc với ý nghĩa tượng trưng riêng biệt.
      Loài hoa được sử dụng thường xuyên trong lễ cưới là hoa hồng.
      <img src="${blog5Image}" alt="Hoa" class="blog-detail-small-image"/></br>
      Hoa hồng tượng trưng cho tình yêu cháy bỏng, ngọt ngào. Hoa hồng trắng nói lên một tình yêu trong sáng,
      thuần khiết. Hoa hồng tím mang thông điệp lãng mạn, thủy chung. Hoa hồng xanh đại diện cho một tình yêu vĩnh cửu, bất diệt.
      Có thể nói, hoa là phụ kiện trang trí tiệc cưới không thể thiếu trong ngày cưới. 
      Hoa mang đến vẻ đẹp nhẹ nhàng, lãng mạn, thuần khiết làm cho buổi tiệc trở nên trang trọng hơn.
      
      <h3><strong>2. Ánh nến – Phụ kiện trang trí tiệc cưới không thể thiếu</strong></h3>
      Ánh nến cũng là một điều không thể thiếu trong bộ sưu tập các phụ kiện trang trí tiệc cưới.
      Ánh nến giúp không gian tiệc cưới của bạn thêm lãng mạn và ấm cúng, gần gũi. Chính vì vậy, 
      trên mỗi bàn tiệc khách mời đều có những ánh nến lung linh, giúp tăng thêm sự gần gũi giữa khách mời và 2 bên gia đình.</br>
     <img src="${blog6Image}" alt="Nến" class="blog-detail-small-image"/> </br>
     </br>Nến trắng cho một buổi tiệc lãng mạn nhẹ nhàng. Nến đỏ mang màu sắc cổ điển, tăng tính đồng nhất cho buổi tiệc.
     Nến xanh, tím mới lạ, tính nghệ thuật cao. Nếu bạn cảm thấy dùng quá nhiều nến không an toàn thì hãy suy nghĩ đến việc dùng nến điện.
      <h3><strong>3. Dây pha lê</strong></h3>
      Ngoài đèn chùm và nến, dây pha lê cũng là một phụ kiện trang trí tiệc cưới giúp lễ cưới của bạn thêm phần lung linh hơn.
      Nếu bạn dự định tổ chức Concept đám cưới của mình mang tính cổ tích thì dây pha lê là phụ kiện hoàn hảo dành cho bạn.
      <img src="${blog7Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
      Những dải dây pha lê hình giọt nước với độ dài ngắn khác nhau được thả từ trần cùng với những ánh đèn rực rỡ sẽ hóa không gian tiệc cưới như khu vườn cổ tích.
      Màu của đèn pha lê sẽ có màu tương đồng với màu chủ đạo của cả buổi tiệc.
      
     <h3><strong>4. Bóng bóng</strong></h3>
     Bong bóng là một phụ kiện trang trí tiệc cưới không còn quá xa lạ đối với mỗi người. 
     Tuy không mới, nhưng nó vẫn mang một vẻ đẹp riêng và giá thành lại rất hợp lý. 
     <img src="${blog8Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
 Hiện nay những chiếc bong bóng cũng được cách tân rất nhiều, với nhiều kiểu dáng, màu sắc được cải tiến, 
 toát lên vẻ bay bổng, trang trọng cho cả buổi tiệc. Một số loại bong bóng như: Bong bóng kim tuyến, bong bóng ngôi sao, bong bóng trái tim, 
 bong bóng gắn đèn LED,…Bong bóng thường được thiết kế ở sảnh tiệc, khu vực sân khấu và 2 bên lối đi của khách mời.
    `,
    image: require('../../assets/images/blog2.jpg'),
  },
  {
    id: 6,
    title: "Nghi thức đám cưới Thiên Chúa giáo bạn cần biết",
    content: `
     Thiên Chúa giáo hay còn gọi là Công giáo có nhiều đức tin và nghi lễ khác nhau. Trong đó nghi thức lễ cưới công giáo được quan tâm khá nhiều khi một trong hai hoặc cả cô dâu, chú rể có liên quan đến tôn giáo này. Trước khi làm lễ cưới và trong khi tiến hành lễ, công giáo có khá nhiều nghi thức cần phải thực hiện. Cùng A-Z Studio tìm hiểu một chút về những điều này nhé!</br>
      
      <h3><strong>Hôn nhân trong Thiên Chúa giáo</strong></h3>
      Trong giáo hội Thiên Chúa giáo, việc kết hôn được xem là “bí tích hôn nhân”. Với ý nghĩa là sự hợp tác giữa một nam và một nữ thông qua truyền giáo.
       <img src="${blog21Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
      Người theo đạo Công giáo tin rằng khi được nhận bí tích hôn nhân một cách chính thức, thì cặp đôi này sẽ được chúc phúc yêu thương, chung thủy với nhau. Đây được xem là một giao ước do chính Chúa Giêsu đã lập.

      <h3><strong>Trước khi làm lễ cưới trong Thiên Chúa giáo</strong></h3>
      Mặc dù Thiên Chúa giáo luôn khuyến khích việc tiến đến hôn nhân thì cả nam và nữ phải theo đạo Thiên Chúa giáo. Tuy nhiên hiện nay, giáo hội này cũng đã có phần nhượng bộ khi cho phép khác tôn giáo được đến với nhau. Nhưng hình thức sẽ có đôi chút khác biệt so với cùng tôn giáo.</br>

      Những người theo đạo Thiên Chúa giáo nếu muốn làm lễ cưới phải lãnh ngộ các bí tích, các bí tích này thường được học trong một thời gian dài tầm 6-7 năm. Tuy nhiên nếu bạn khác tôn giáo, việc lãnh ngộ các bí tích đó mất quá nhiều thời gian.
        <img src="${blog24Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
      </br>Vì vậy, để được làm hôn lễ bạn có thể học và gia nhập Thiên Chúa giáo trong vòng vài tháng. Đây được gọi là lớp giáo lý tân lòng, nhằm lãnh ngộ đức tin của bạn đối với Thiên Chúa giáo. Ngoài ra bạn còn phải học giáo lý hôn nhân của giáo hội này.</br>

       Tại sao phải học giáo lý hôn nhân? Đây là chứng chỉ bạn phải đạt được nếu muốn cha xứ chấp nhận để thông báo hôn nhân trong ba thánh lễ chủ nhật liên tiếp. Cùng với chứng chỉ giáo lý hôn nhân bạn phải xuất trình thêm chứng nhận đăng ký kết hôn.  
       </br>
      <h3><strong>Nghi thức lễ cưới Thiên Chúa giáo</strong></h3>
      Lễ cưới Thiên Chúa giáo khá khác biệt so với nghi thức lễ cưới thông thường. Đối với Thiên Chúa giáo, hôn lễ chính thức phải được cử hành tại thánh đường có giáo dân tham dự. Qua hai nghi thức chính là nghi thức tuyên tín và nghi thức trao nhẫn.
       <img src="${blog22Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
       Ngoài nghi thức chính diễn ra tại thánh đường, còn có các nghi thức tại gia. Thường các gia đình theo Công giáo đa phần không có bàn thờ ông bà tổ tiên, mà có bàn thờ chúa.


        Có thể bày chiếc bàn nhỏ đơn giản dưới bàn thờ chúa, cùng một ít hoa quả, đèn và 3 nén hương. Sau đó thực hiện nghi thức thành kính với ông bà tổ tiên. (Tránh đặt trái cây lên bàn thờ của Chúa).
        Nghi thức lễ cưới công giáo sẽ diễn ra như sau:
        </br>
        <h3><strong>Nghi lễ cưới Thiên Chúa giáo tại nhà gái</strong></h3>
        Nhà trai ngỏ lời với nhà gái và giới thiệu sính lễ. Cả hai gia đình sẽ giới thiệu thành phần tham dự lễ. Mẹ chồng sẽ tặng trang sức cho cô dâu. Sau đó cô dâu và chú rể sẽ đốt nến lên bàn thờ tổ tiên, trong khi bàn thờ chúa là đèn trắng (được đốt trước đó).
         <img src="${blog25Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
         Tiếp theo là thực hiện nghi lễ tạ ơn Thiên chúa. Chủ sự sẽ nói đôi lời về buổi lễ và tạ ơn Thiên chúa. Sau đó Cộng đoàn sẽ hát bài “Xin vâng”.
         Cuối cùng là các bước kính tổ tiên, cảm ơn cha mẹ và xin dâu.
         </br>
          <h3><strong>Nghi lễ cưới Thiên Chúa giáo tại nhà trai</strong></h3>
          Cả Cộng đoàn sẽ thực hiện nghi lễ trình diện Thiên chúa và tổ tiên. Sau đó là công bố lời Chúa trong thư thánh Phaolô Tông đồ gởi tín hữu Ê-phê-sô. Vị chủ sự sẽ tiếp tục với lời nguyện Cộng đoàn.

          Để kết thúc nghi lễ cưới Thiên Chúa giáo, cộng đoàn sẽ hát bài: “Đâu có tình yêu thương” hoặc bài “Hồng ân Thiên Chúa bao la”.
             <img src="${blog23Image}" alt="Dây pha lê" class="blog-detail-small-image"/></br>
          Có thể thấy, nghi thức lễ cưới Thiên Chúa giáo khá khác biệt so với nghi thức lễ cưới thông thường. Hy vọng những thông tin trên sẽ giúp bạn đọc hiểu rõ hơn về các nghi thức lễ cưới này. Theo dõi fanpage và website của A-Z Studio để cập nhật những thông tin mới nhất nhé! 
    `,
    image: require('../../assets/images/blogchua.jpg'),
  },
  // Thêm các blog khác nếu cần
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <div>Blog không tồn tại.</div>;
  }

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p><img src={blog.image} alt={blog.title} className="blog-detail-image" /></p>
      <p dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogDetail;
