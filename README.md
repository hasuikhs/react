# React

- React는 Facebook이 만든 사용자 UI 구축을 위한 라이브러리
- View 중심

## 특징

### 1. JSX 문법

- React는 선언형(Declartive) 프로그래밍

- JSX는 JavaScript 안에서 HTML 문법을사용해서 view를 구성을 도와줌
- JSX를 얻기 위한 알고리즘에 대한 구현을 하지 않음(document.createElement 등)
- 이와같이 **선언형의 특성은 화면 설계에 초점을 맞춰 개발할 수 있도록하여 다른 부분에 고민을 최소화하여 높은 생산성 보장**

```react
class HelloMessage extends React.Component {
    render() {
        return (
        	<div>
            	Hello {this.props.name}
            </div>
        );
    }
}
```

- JSX의 사용으로, React의 사용성은 증가하였고, 대표적인 특징이 됨

### 2. Component 기반

- React는 Component 기반의 라이브러리
- 여러 부분을 **Component화해서 코드의 재사용성과 유지보수성 증가**

