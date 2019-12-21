import React from 'react';

function Thanks() {
  return (
    <div className="container">
      <p className="text-center">
        Thanks for Signing up! Your information has been saved, and submitted to
        insurance for a quote unique to you. Our staff will reach out to you by
        email within the next 2 business days.
      </p>
      <p className="text-center">
        If you have any questions, dont hesitate to shoot us an email at{' '}
        <a href="mailto:support@waive.com">support@waive.com</a>.
      </p>
      <p className="text-center">
        If you're interested in a partnership with us or advertising
        opportunities, email us at{' '}
        <a href="mailto:info@waive.com">info@waive.com</a>.
      </p>
    </div>
  );
}

export default Thanks;
