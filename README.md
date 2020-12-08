# React

- React는 Facebook이 만든 사용자 UI 구축을 위한 라이브러리
- View 중심

## 특징

### 1. JSX 문법

- JSX는 JavaScript 안에서 HTML 문법을사용해서 view를 구성을 도와줌

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