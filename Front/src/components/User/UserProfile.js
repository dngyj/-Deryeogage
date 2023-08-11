import axios from "axios";
import { useEffect, useState } from "react";
import * as S from "../../styled/User/UserProfile.style";

function UserProfile({ data }) {
  const [userInfo, setUserInfo] = useState([]);
  const [showPromise, setShowPromise] = useState(false); // 입양서약서를 표시할지 여부를 관리하는 상태
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${REACT_APP_API_URL}/users/profile`, {
          headers: {
            userId: data,
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data.data);
        setUserInfo(response.data.data); // userInfo 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [data, REACT_APP_API_URL]);

  console.log("USERINFO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", userInfo);

  // 입양서약서 보기 버튼 클릭 핸들러
  const handleShowPromiseClick = () => {
    setShowPromise(!showPromise); // 입양서약서 표시 상태를 토글
  };

  return (
    <div>
      <p>
        <S.ProfileImg
          src={userInfo.profilePic || "/assets/free-icon-user-847969.png"}
          alt="Profile"
        />
        {userInfo.nickname}
      </p>
      <p>
        입양수:{userInfo.adoptToCount} 분양수:{userInfo.adoptFromCount}
      </p>
      <p>
        시뮬레이션 칭호:{" "}
        {userInfo.simulationTitle || "시뮬레이션을 진행하지 않았습니다."}
      </p>

      <p>사전테스트 점수: {userInfo.preTestScore}</p>
      <button onClick={handleShowPromiseClick}>입양서약서 보기</button>
      {showPromise &&
        (userInfo.preTestPromise ? (
          <div>
            <h3>입양서약서:</h3>
            <p>{userInfo.preTestPromise}</p> {/* 입양서약서 표시 */}
          </div>
        ) : (
          <p>입양서약서가 존재하지 않습니다.</p> // 입양서약서가 없는 경우
        ))}
    </div>
  );
}

export default UserProfile;
