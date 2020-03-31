import React from "react";



// in stateless componenet function you have to pass in props and remove this keyword
const Like = (props) => {
    let classes = "UnLike";
    if (!props.liked) classes = "Like";
    return (
      <i onClick={props.onClicking} 
         style={{ cursor: "pointer" }}>
        {classes}
      </i>
    );
}
 
export default Like;

// class Like extends Component {
//   render() {
//     let classes = "UnLike";
//     if (!this.props.liked) classes = "Like";
//     return (
//       <i onClick={this.props.onClicking} 
//          style={{ cursor: "pointer" }}>
//         {classes}
//       </i>
//     );
//   }
// }

// export default Like;
