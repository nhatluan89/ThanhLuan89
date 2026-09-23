import { useState } from 'react'

const Arrow = () => <span aria-hidden="true">↗</span>
const Check = () => <span className="check" aria-hidden="true">✓</span>

const steps = [
  ['01', 'Lắng nghe câu chuyện', 'Làm rõ hoàn cảnh, mục tiêu và điều đang khiến bạn mất phương hướng.'],
  ['02', 'Chụp nhanh hiện trạng', 'Phác họa dòng tiền, tài sản, nghĩa vụ và những điểm nghẽn quan trọng.'],
  ['03', 'Xác định “nút thắt”', 'Tìm đúng nguyên nhân gốc thay vì tiếp tục xử lý những triệu chứng bề mặt.'],
  ['04', 'Thiết lập ưu tiên', 'Sắp xếp việc cần làm theo mức độ cấp thiết và tác động tới cuộc sống.'],
  ['05', 'Thiết kế phương án', 'Xây dựng giải pháp thực tế, vừa sức và phù hợp với nguồn lực của bạn.'],
  ['06', 'Lập kế hoạch hành động', 'Chuyển phương án thành các bước cụ thể với thời hạn rõ ràng.'],
  ['07', 'Cam kết bước đầu tiên', 'Chốt hành động ngay sau buổi tư vấn để tạo đà thay đổi bền vững.'],
]

const outcomes = [
  'Nhìn rõ bức tranh tài chính hiện tại bằng những con số thực tế',
  'Xác định đúng vấn đề ưu tiên cần giải quyết trước',
  'Có lộ trình hành động rõ ràng cho 30–90 ngày tiếp theo',
  'Tự tin hơn khi đưa ra những quyết định quan trọng về tiền',
]

function LeadForm() {
  const [state, setState] = useState({ status: 'idle', message: '' })

  async function submit(event) {
    event.preventDefault()
    setState({ status: 'loading', message: '' })
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form))

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'go-mac-tai-chinh-1-1' }),
      })
      if (!response.ok) throw new Error('Không thể gửi đăng ký')
      form.reset()
      setState({ status: 'success', message: 'Đăng ký thành công! Luan7x10 sẽ liên hệ với bạn sớm nhất.' })
    } catch {
      setState({ status: 'error', message: 'Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp với Luan7x10.' })
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="field-row">
        <label>Họ và tên<input name="name" autoComplete="name" placeholder="Nguyễn Văn A" required /></label>
        <label>Số điện thoại<input name="phone" type="tel" autoComplete="tel" placeholder="09xx xxx xxx" required /></label>
      </div>
      <label>Email<input name="email" type="email" autoComplete="email" placeholder="email@cuaban.com" required /></label>
      <label>Vấn đề bạn muốn gỡ mắc<textarea name="message" rows="3" placeholder="Chia sẻ ngắn để buổi tư vấn đi thẳng vào trọng tâm..." required /></label>
      <button className="button button-dark form-button" type="submit" disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Đang gửi...' : 'Đăng ký tư vấn 1:1 — 500.000 VNĐ'} <Arrow />
      </button>
      <p className="privacy">Thông tin của bạn được bảo mật và chỉ dùng để liên hệ tư vấn.</p>
      {state.message && <p className={`form-message ${state.status}`} role="status">{state.message}</p>}
    </form>
  )
}

function App() {
  return (
    <>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Luan7x10 - Trang chủ">LUAN<span>7x10</span></a>
        <nav aria-label="Điều hướng chính">
          <a href="#phuong-phap">Phương pháp</a><a href="#goi-dong-hanh">Đồng hành</a>
        </nav>
        <a className="nav-cta" href="#go-mac-1-1">Đăng ký 1:1 <Arrow /></a>
      </header>

      <main id="top">
        <section className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">Tài chính cá nhân · Rõ ràng để tự do</p>
            <h1>Đừng để những<br />“mắc kẹt” tài chính<br /><em>giữ chân bạn.</em></h1>
            <p className="hero-lead">Một cuộc trò chuyện đúng trọng tâm có thể giúp bạn nhìn rõ vấn đề, tìm thấy hướng đi và bắt đầu hành động.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#go-mac-1-1">Gỡ Mắc Tài Chính 1:1 <Arrow /></a>
              <span><b>500.000 VNĐ</b><small>90 phút tập trung</small></span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun"></div><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
            <div className="quote-card"><span>“</span><p>Rõ vấn đề.<br />Đúng hướng đi.<br />Vững bước đầu.</p></div>
            <div className="mini-card"><small>PHƯƠNG PHÁP</small><strong>7 × 10</strong><span>7 bước · 10 năm trải nghiệm</span></div>
          </div>
        </section>

        <section className="trust-strip"><div className="shell">
          <p>Dành cho bạn khi</p><span>◉ Thu nhập tốt nhưng không tích lũy</span><span>◉ Đứng trước quyết định tài chính lớn</span><span>◉ Cần một góc nhìn độc lập</span>
        </div></section>

        <section className="method shell" id="phuong-phap">
          <div className="section-heading"><div><p className="eyebrow">Phương pháp Luan7x10</p><h2>7 bước để biến<br />rối ren thành <em>rõ ràng.</em></h2></div><p>Không lời khuyên chung chung. Chúng ta đi từ câu chuyện thật của bạn đến một kế hoạch có thể bắt đầu ngay.</p></div>
          <div className="steps">
            {steps.map(([number, title, copy]) => <article className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="consult" id="go-mac-1-1">
          <div className="shell consult-grid">
            <div className="consult-copy">
              <p className="eyebrow light">Gỡ Mắc Tài Chính 1:1</p>
              <h2>90 phút dành riêng<br />cho bài toán <em>của bạn.</em></h2>
              <p className="intro">Một phiên tư vấn sâu, riêng tư và thực tế với Luan7x10. Bạn không cần chuẩn bị một kế hoạch hoàn hảo — chỉ cần mang đến vấn đề thật.</p>
              <div className="price"><strong>500.000</strong><span>VNĐ<br /><small>/ 90 phút</small></span></div>
              <div className="deliverables">
                <h3>Sau buổi tư vấn, bạn sẽ:</h3>
                {outcomes.map(item => <p key={item}><Check />{item}</p>)}
              </div>
              <div className="gift"><div>✦</div><p><small>TÀI LIỆU TẶNG KÈM</small><b>Bản đồ hành động tài chính cá nhân</b><span>File tổng hợp hiện trạng, ưu tiên và checklist hành động được cá nhân hóa sau buổi tư vấn.</span></p></div>
            </div>
            <div className="form-wrap">
              <div className="form-title"><span>ĐĂNG KÝ GIỮ LỊCH</span><h3>Bắt đầu gỡ mắc<br />ngay hôm nay.</h3><p>Điền thông tin dưới đây, Luan7x10 sẽ liên hệ xác nhận lịch phù hợp.</p></div>
              <LeadForm />
            </div>
          </div>
        </section>

        <section className="pricing shell" id="goi-dong-hanh">
          <div className="section-heading"><div><p className="eyebrow">Đồng hành dài hạn</p><h2>Khi bạn cần đi<br /><em>xa hơn.</em></h2></div><p>Các gói đồng hành chuyên sâu giúp bạn duy trì kỷ luật, điều chỉnh kế hoạch và tiến gần hơn tới mục tiêu.</p></div>
          <div className="price-cards">
            <article><small>GÓI 01 · TĂNG TỐC</small><h3>20 triệu</h3><p className="term">3 tháng đồng hành</p><p>Tập trung tháo gỡ một mục tiêu tài chính quan trọng với lộ trình sát sao.</p><a href="#go-mac-1-1">Trao đổi thêm <Arrow /></a></article>
            <article className="featured"><span className="popular">PHÙ HỢP ĐƯỜNG DÀI</span><small>GÓI 02 · BỀN VỮNG</small><h3>40 triệu</h3><p className="term">1 năm đồng hành</p><p>Xây dựng và duy trì một hệ thống tài chính toàn diện, thích ứng theo từng giai đoạn.</p><a href="#go-mac-1-1">Trao đổi thêm <Arrow /></a></article>
          </div>
        </section>
      </main>

      <footer><div className="shell"><a className="brand inverse" href="#top">LUAN<span>7x10</span></a><p>Rõ tài chính. Vững tương lai.</p><a href="#go-mac-1-1">Đăng ký tư vấn <Arrow /></a></div></footer>
    </>
  )
}

export default App
