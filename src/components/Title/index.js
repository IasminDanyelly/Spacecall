import './title.css'

export default function Title({children, name}){
    return(
        <div className="title-component">
          {children}
          <span>{name}</span>
        </div>
    )
}