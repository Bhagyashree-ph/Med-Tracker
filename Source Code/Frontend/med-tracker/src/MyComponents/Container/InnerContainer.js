export default function InnerContainer({ children }) {

    return (
        <div style={{ position: 'absolute', left: '250px', top: '30px', width: '1000px' }}>
            {children}
        </div>
    )
}