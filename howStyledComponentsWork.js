// 템플릿 리터럴 중, 태그 템플릿 리터럴이 핵심
//  - 함수에 템플릿리터럴을 바로전달

// 태그 템플릿 리터럴에 대해서
// https://mxstbr.blog/2016/11/styled-components-magic-explained/

const styled =
  type =>
  (strs, ...liters) =>
  props => {
    let result = "";
    strs.forEach((str, i) => {
      let literRes = "";
      if (liters[i]) {
        literRes =
          typeof liters[i] === "function" ? liters[i](props) : liters[i];
      }
      result = result + str + literRes;
    });
    console.log(type, result);
  };

const StyldDiv = styled("div")`
  font-size: ${({ title }) => (title ? "16px" : "14px")};
  color: ${({ color }) => color};
`;

StyldDiv({ type: "div", color: "red" });

// 실제로 어떻게 사용되는지
//    - props를 인자로 받아서 스타일이 적용된 컴포넌트를 반환하는 함수 자체가 Button이 되는거임
// https://john015.netlify.app/styled-components%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%99%EC%9E%91%ED%95%A0%EA%B9%8C
