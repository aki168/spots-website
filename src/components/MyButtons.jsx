import styled from "styled-components";

const CustomBtn = styled.div`
  font-weight: bold;
  display: inline-block;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  /* background: linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%); */
  background: ${({type}) => {
    let colorStart, colorEnd;
    switch(type){
      case 'success': colorStart, colorEnd = 'rgba(34,193,195,1) 0%', 'rgba(253,187,45,1) 100%'
      break
      case 'normal': colorStart, colorEnd = '#fff 0%', '#eee 100%'
      break
      case 'warnning': colorStart, colorEnd = ' rgba(131,58,180,1) 0%', 'rgba(253,29,29,1) 50% ) 100%'
      break
      case 'info' : colorStart, colorEnd = 'rgba(2,0,36,1) 0%', 'rgba(0,212,255,1) 100%'
      break
      default : colorStart, colorEnd = '#001111 0%', '#eee 100%'
    }
  return `linear-gradient(90deg, ${colorStart}, ${colorEnd}) ` 
}};
  color: ${({type}) => ( type === 'normal' ? '#000' : '#001111' )};
  &:hover{
    opacity: 0.7;
    cursor: pointer;
  }
`

export const Btn = ({children}) => {
  return(
    <CustomBtn>{children}</CustomBtn>
  )
} 


  /* ${({type}) => {
    let btnColor;
    switch(type){
      case 'success': btnColor = '90 deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%'
      break
      case 'normal': btnColor = '#fff'
      break
      case 'warnning': btnColor = '90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50% ) 100%'
      break
      case 'info' : btnColor = '90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%'
      break
      default : btnColor = '#001111'
    }
  return `linear-gradient(${btnColor}) ` */
  /* } */
/* }; */