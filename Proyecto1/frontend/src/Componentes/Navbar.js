import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
    const estilo = {
        background: "rgba(0.5,.5,0.5,.3)",
        "border" : "none",
    };

    return (
        <div style={estilo}>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="navbar-brand" href="#">
                        <img src="/docs/4.1/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                        Bootstrap
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page">Active</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Link</a>
                </li>
            </ul>
        </div>
    );
}