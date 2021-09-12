import { Layout, Typography } from 'antd';

const { Footer } = Layout
const { Link } = Typography

export default function FooterComponent(){
    return (
        <>
            <Footer 
                style={{ textAlign: 'center' }}
            >
                SAPS3 &#169;2021 Created by&nbsp; 
                <Link 
                    href="https://www.linkedin.com/in/felipe-lima-3010/"
                    target="_blank"
                >
                    Felipe Lima
                </Link>
            </Footer>
        </>
    )
}