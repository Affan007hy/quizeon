$(document).ready(function () {
    $('.nav-link').click(function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $('#profile-link').click(function () {
        $('#content').html(`
            <div class="container mt-4">
                <div class="card shadow-lg">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0">Login and Security</h5>
                    </div>
                    <div class="card-body">
                        <div class="security-section">
                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Email</strong><br>af*********@gmail.com</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Update</a></div>
                            </div>
                            <hr>

                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Password</strong><br>●●●●●●●●●●</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Change</a></div>
                            </div>
                            <hr>

                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Security Questions</strong><br>Add a security question.</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Update</a></div>
                            </div>
                            <hr>

                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>2-Step Verification</strong><br>Add an extra layer of security.</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Update</a></div>
                            </div>
                            <hr>

                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Stay Logged in</strong><br>Manage devices and browsers.</div>
                                <div class="col-md-6 text-right"><a href="#" class="update-link">Edit</a></div>
                            </div>
                            <hr>

                            <div class="row align-items-center">
                                <div class="col-md-6"><strong>Account Type</strong><br>Business</div>
                                <div class="col-md-6 text-right"><a href="#" class="close-link">Close account</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    $('#quiz-link').click(function () {
        $('#content').html('<h5>My Quizzes</h5><p>List of quizzes you have created or participated in.</p>');
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
