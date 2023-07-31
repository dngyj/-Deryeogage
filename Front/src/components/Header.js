import 'bootstrap/dist/css/bootstrap.min.css';
import * as S from "../styled/Header.style"


function Header() {
  // 토큰 유무에 따라 로그인 <-> 마이페이지 변경할 수 있게 쓸거임
  const insertedToken = localStorage.getItem("accessToken");
  const isLoggedIn = insertedToken !== null;

  return (
    <S.HeaderWrapper className="navbar navbar-expand-lg">
      <div className="container-fluid">
          <a className="navbar-brand" href="/"><img alt='Logo' src="/assets/Logo.png" width="40"/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/adopt">입양게시판</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/review">입양후기</a>
            </li>
            <li className="nav-item dropdown">
              <S.ButtonWrapper className="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                진단하기
              </S.ButtonWrapper>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/simulation">시뮬레이션</a></li>
                <li><a className="dropdown-item" href="/checklist">체크리스트</a></li>
              </ul>
            </li>
            {isLoggedIn ? ( // 토큰이 있으면 마이페이지 버튼을 보여줌
              <li className="nav-item">
                <a className="nav-link" href="/profile/:id">마이페이지</a>
              </li>
            ) : ( // 토큰이 없으면 로그인 버튼을 보여줌
              <li className="nav-item">
                <a className="nav-link" href="/login">로그인</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </S.HeaderWrapper>
  );
}

export default Header;
