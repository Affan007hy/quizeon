$(document).ready(function () {
    $('.nav-link').click(function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Mask email function (move this inside or before profile-link click)
    function maskEmail(email) {
        const [name, domain] = email.split("@");
        const maskedName = name.slice(0, 4) + "*".repeat(Math.max(0, name.length - 2));
        return maskedName + "@" + domain;
    }

    function formatIndianDate(joined) {
        return joined.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).replace(',', '').trim();
    }


    $('#profile-link').click(function () {
        const maskedEmail = maskEmail(user.email); // Apply masking here

        $('#content').html(`
            <div class="container mt-4">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Information</h5>
                    </div>
                    <div class="card-body">
                        <div class="security-section">
                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Name</strong><br>${user.name}</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Update</a></div>
                            </div>
                            <hr>
                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Email</strong><br>${maskedEmail}</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Update</a></div>
                            </div>
                            <hr>
                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Joined on</strong><br>${formatIndianDate(new Date(user.joined))}</div>
                            </div>
                            <hr>
                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Total Score</strong><br>${user.totalScore || 0}</div>
                                <div class="col-md-6 text-right"></div>
                            </div>
                            <hr>
                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Quizzes Taken</strong><br>${user.quizzesTaken || 0}</div>
                                <div class="col-md-6 text-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    $('#quiz-link').click(function () {
        const quizzesHtml = `
            <h5>Quizzes</h5>
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">JavaScript Basics</h5>
                        <small>Easy</small>
                    </div>
                    <p class="mb-1">Test your knowledge of JavaScript fundamentals.</p>
                    <button class="btn btn-sm btn-primary mt-2">Start Quiz</button>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Web Development</h5>
                        <small>Medium</small>
                    </div>
                    <p class="mb-1">Covers HTML, CSS, and responsive design principles.</p>
                    <button class="btn btn-sm btn-primary mt-2">Start Quiz</button>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Networking Essentials</h5>
                        <small>Hard</small>
                    </div>
                    <p class="mb-1">Quiz on computer networks, protocols, and security basics.</p>
                    <button class="btn btn-sm btn-primary mt-2">Start Quiz</button>
                </a>
            </div>
        `;
        $('#content').html(quizzesHtml);
    });


    $('#history-link').click(function () {
        $('#content').html('<h5>My History</h5><p>Review your past quiz attempts.</p>');
    });

    $('#statistics-link').click(function () {
        $('#content').html('<h5>My Statistics</h5><p>Track your performance and progress.</p>');
    });

    $('#settings-link').click(function () {
        $('#content').html('<h5>Settings</h5><p>Manage your account settings here.</p>');
    });

    // Open Profile tab by default
    $('#profile-link').trigger('click').addClass('active');
});
