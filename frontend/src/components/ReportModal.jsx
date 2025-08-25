import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ReportModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}
      >
        <motion.div
          className="modal-content p-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--bg-primary)',
            borderRadius: '0.5rem',
            width: '90%',
            maxWidth: '600px',
            color: 'var(--text-primary)',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
          }}
        >
          <h4 className="mb-3">Report ID: {report.id}</h4>
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Content:</strong> {report.content}</p>
          {report.ai_feedback && (
            <div className="mt-3 p-3 bg-dark text-light rounded position-relative" style={{ maxHeight: 220, overflowY: 'auto' }} id="ai-feedback-scroll">
              <h5>AI Feedback:</h5>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: 'none', color: 'inherit', border: 'none', margin: 0 }}>{report.ai_feedback}</pre>
              <button
                className="btn btn-sm btn-light position-absolute"
                style={{ right: 10, bottom: 10 }}
                onClick={() => {
                  const el = document.getElementById('ai-feedback-scroll');
                  if (el) el.scrollTop = el.scrollHeight;
                }}
                title="Scroll to bottom"
              >↓</button>
              <button
                className="btn btn-sm btn-light position-absolute"
                style={{ right: 10, top: 10 }}
                onClick={() => {
                  const el = document.getElementById('ai-feedback-scroll');
                  if (el) el.scrollTop = 0;
                }}
                title="Scroll to top"
              >↑</button>
            </div>
          )}
          <div className="text-end mt-3">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportModal;