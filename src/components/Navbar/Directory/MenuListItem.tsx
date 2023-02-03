import React from "react"
import { IconType } from "react-icons"

type DirectoryItemProps = {
  displayText: string
  link: string
  icon: IconType
  iconColor: string
  imageURL?: string
}

const MenuListItem:React.FC<DirectoryItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL
}) => {
  console.log(displayText,
    link,
    icon,
    iconColor,
    imageURL);
  
  return (
    <>
    
    </>
  )
}

export default MenuListItem
