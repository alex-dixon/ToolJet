import React from 'react';

function DrawerFooter({ fetching, onClose, isEditMode, onCreate, onEdit }) {
  return (
    <div className="position-sticky bottom-0 right-0 w-100  mt-auto">
      <div className="d-flex justify-content-end drawer-footer-btn-wrap">
        <a className="btn" data-cy={`cancel-button`} onClick={onClose}>
          Cancel
        </a>
        {isEditMode && (
          <button disabled={fetching} className="btn btn-primary" data-cy={`save-changes-button`} onClick={onEdit}>
            <svg
              className="icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 2.32682C2.77899 2.32682 2.56702 2.41462 2.41074 2.5709C2.25446 2.72718 2.16667 2.93914 2.16667 3.16016V13.1602C2.16667 13.3812 2.25446 13.5931 2.41074 13.7494C2.56702 13.9057 2.77899 13.9935 3 13.9935H13C13.221 13.9935 13.433 13.9057 13.5893 13.7494C13.7455 13.5931 13.8333 13.3812 13.8333 13.1602V5.172L10.9882 2.32682H10.5V4.82682C10.5 5.28706 10.1269 5.66016 9.66667 5.66016H4.66667C4.20643 5.66016 3.83333 5.28706 3.83333 4.82682V2.32682H3ZM3 0.660156C2.33696 0.660156 1.70107 0.923548 1.23223 1.39239C0.763392 1.86123 0.5 2.49712 0.5 3.16016V13.1602C0.5 13.8232 0.763392 14.4591 1.23223 14.9279C1.70107 15.3968 2.33696 15.6602 3 15.6602H13C13.663 15.6602 14.2989 15.3968 14.7678 14.9279C15.2366 14.4591 15.5 13.8232 15.5 13.1602V4.82682C15.5 4.60581 15.4122 4.39385 15.2559 4.23757L11.9226 0.904234C11.7663 0.747954 11.5543 0.660156 11.3333 0.660156H3ZM5.5 2.32682V3.99349H8.83333V2.32682H5.5ZM8 8.99349C7.53976 8.99349 7.16667 9.36658 7.16667 9.82682C7.16667 10.2871 7.53976 10.6602 8 10.6602C8.46024 10.6602 8.83333 10.2871 8.83333 9.82682C8.83333 9.36658 8.46024 8.99349 8 8.99349ZM5.5 9.82682C5.5 8.44611 6.61929 7.32682 8 7.32682C9.38071 7.32682 10.5 8.44611 10.5 9.82682C10.5 11.2075 9.38071 12.3268 8 12.3268C6.61929 12.3268 5.5 11.2075 5.5 9.82682Z"
                fill="#FDFDFE"
              />
            </svg>
            Save changes
          </button>
        )}
        {!isEditMode && (
          <button disabled={fetching} className="btn btn-primary" data-cy={`create-button`} onClick={onCreate}>
            <svg
              className="icon"
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.32617 2.49382C3.10516 2.49382 2.8932 2.58161 2.73692 2.73789C2.58064 2.89417 2.49284 3.10613 2.49284 3.32715V14.9938C2.49284 15.2148 2.58064 15.4268 2.73692 15.5831C2.8932 15.7394 3.10516 15.8271 3.32617 15.8271H11.6595C11.8805 15.8271 12.0925 15.7394 12.2488 15.5831C12.405 15.4268 12.4928 15.2148 12.4928 14.9938V6.66048H9.99284C9.55081 6.66048 9.12689 6.48489 8.81433 6.17233C8.50177 5.85977 8.32617 5.43584 8.32617 4.99382V2.49382H3.32617ZM9.99284 3.67233L11.3143 4.99382H9.99284V3.67233ZM1.5584 1.55938C2.02725 1.09054 2.66313 0.827148 3.32617 0.827148H9.15951C9.38052 0.827148 9.59248 0.914946 9.74876 1.07123L13.9154 5.23789C14.0717 5.39417 14.1595 5.60614 14.1595 5.82715V14.9938C14.1595 15.6569 13.8961 16.2927 13.4273 16.7616C12.9584 17.2304 12.3225 17.4938 11.6595 17.4938H3.32617C2.66313 17.4938 2.02725 17.2304 1.5584 16.7616C1.08956 16.2927 0.826172 15.6569 0.826172 14.9938V3.32715C0.826172 2.66411 1.08956 2.02822 1.5584 1.55938ZM7.49284 7.49382C7.95308 7.49382 8.32617 7.86691 8.32617 8.32715V9.99382H9.99284C10.4531 9.99382 10.8262 10.3669 10.8262 10.8271C10.8262 11.2874 10.4531 11.6605 9.99284 11.6605H8.32617V13.3271C8.32617 13.7874 7.95308 14.1605 7.49284 14.1605C7.0326 14.1605 6.65951 13.7874 6.65951 13.3271V11.6605H4.99284C4.5326 11.6605 4.15951 11.2874 4.15951 10.8271C4.15951 10.3669 4.5326 9.99382 4.99284 9.99382H6.65951V8.32715C6.65951 7.86691 7.0326 7.49382 7.49284 7.49382Z"
                fill="#FDFDFE"
              />
            </svg>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default DrawerFooter;
