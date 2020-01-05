import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import Box from "../components/Box";
import css from "@emotion/css";
import Button from "../components/Button";
import RegisterInput from "../components/RegisterInput";
import RegisterSelect from "../components/RegisterSelect";
import PageDescription from "../components/PageDescription";
import auth from "../utils/auth";
import { RouteComponentProps } from "react-router";

interface IInfo {
  name: string;
  username: string;
  th: string;
  major: string;
}

const Register: React.FC<RouteComponentProps> = props => {
  const [info, setInfo] = useState<IInfo>({
    name: "",
    username: "",
    th: "19",
    major: "DC"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.persist();
    setInfo(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (info.name && info.username) {
      auth.setUserInfo(info);
      alert("등록이 완료되었습니다.");
      props.history.push("/repository");
    } else {
      alert("입력한 정보를 다시 한번 확인해주세요.");
    }
  };

  return (
    <Box>
      <PageTitle>디미고인이신가요?</PageTitle>
      <PageDescription>
        정보 수집을 위해 아래의 폼을 제출해주세요!
      </PageDescription>
      <form onSubmit={handleSubmit}>
        <RegisterInput
          label="이름"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
        <RegisterInput
          label="Github Username"
          name="username"
          inputLabel="@"
          value={info.username}
          onChange={handleChange}
        />
        <RegisterSelect
          label="학번"
          name="th"
          value={info.th}
          onChange={handleChange}
        >
          <option value="19">19</option>
          <option value="18">18</option>
          <option value="17">17</option>
          <option value="16">16</option>
        </RegisterSelect>
        <RegisterSelect
          label="학과"
          name="major"
          value={info.major}
          onChange={handleChange}
        >
          <option value="DC">디지털컨텐츠과</option>
          <option value="EB">E-비즈니스과</option>
          <option value="WP">웹프로그래밍과</option>
          <option value="HD">해킹방어과</option>
        </RegisterSelect>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 25px;
          `}
        >
          <Button type="submit">제출</Button>
        </div>
      </form>
    </Box>
  );
};

export default Register;
