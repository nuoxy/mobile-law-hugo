document.addEventListener("DOMContentLoaded", () => {
    // === CONFIG (replace these) ===
    const WHATSAPP_NUMBER = "972501234567"; // no + sign
    const WHATSAPP_PREFILL_TEXT = "Hi Alex, I need a quick legal consult. My issue is: ";
    const CALL_NUMBER = "tel:+972501234567";
    const EMAIL = "mailto:office@example.com?subject=" + encodeURIComponent("Legal consultation request");

    // Build links
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL_TEXT)}`;

    const setHref = (id, href) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute("href", href);
    };

    // Assign links
    ["heroWhatsApp", "finalWhatsApp", "stickyWhatsApp"].forEach(id => setHref(id, waUrl));
    ["stickyCall"].forEach(id => setHref(id, CALL_NUMBER));
    ["finalEmail", "stickyEmail"].forEach(id => setHref(id, EMAIL));

    // FAQ accordion
    document.querySelectorAll(".faqItem").forEach(item => {
        const btn = item.querySelector(".faqBtn");
        btn.addEventListener("click", () => {
            const open = item.getAttribute("data-open") === "true";
            document.querySelectorAll(".faqItem").forEach(i => i.setAttribute("data-open", "false"));
            item.setAttribute("data-open", open ? "false" : "true");
        });
    });

    // Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const menuClose = document.getElementById('menuClose');
    const menu = document.getElementById('mainMenu');
    const menuLinks = menu.querySelectorAll('.menuLink');

    function toggleMenu(show) {
        if (!menu || !menuBtn) return;
        menu.setAttribute('aria-hidden', !show);
        menuBtn.setAttribute('aria-expanded', show);
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', () => toggleMenu(true));
    if (menuClose) menuClose.addEventListener('click', () => toggleMenu(false));

    // Close on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Global Share Function (attached to window for onclick access)
async function sharePage(title, url) {
    const data = { title: title, url: url || window.location.href };

    if (navigator.share) {
        try {
            await navigator.share(data);
        } catch (err) {
            console.log('Share canceled', err);
        }
    } else {
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(data.url);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy', err);
            prompt("Copy this link:", data.url);
        }
    }
}
