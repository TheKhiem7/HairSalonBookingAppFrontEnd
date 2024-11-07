import { Typography } from "antd";
import "./index.css";
function AdFooter() {
  return (
    <div className="adfooter">
        <Typography.Link href="tel:+0123456789">+0123456789</Typography.Link>
        <Typography.Link href="https://www.google.com" target="_blank">
        Privacy Policy
        </Typography.Link>
        <Typography.Link href="https://www.google.com" target="_blank">
        Terms of Use
        </Typography.Link>
    </div>
  )
}

export default AdFooter;