import { Component } from 'react'
import './index.css'

const faqsList = [
  {
    id: 0,
    questionText: 'How does DeepCure AI apply Generative AI in diagnostics?',
    answerText: 'DeepCure AI employs cutting-edge Generative AI models to interpret CT and MRI scans with remarkable precision, helping doctors detect early signs of neurological and pulmonary diseases by uncovering subtle imaging patterns.',
  },
  {
    id: 1,
    questionText: 'Which diseases can DeepCure AI detect?',
    answerText: 'Our AI is designed to recognize various conditions such as brain tumors, lung cancer, pneumonia, COPD, tuberculosis, and interstitial lung diseases, providing doctors with in-depth, AI-assisted scan analysis.',
  },
  {
    id: 2,
    questionText: 'How reliable is your AI-driven drug discovery and diagnostics platform?',
    answerText: 'Utilizing advanced machine learning and generative models, our platform excels at predicting protein-ligand binding, analyzing complex protein structures, running automated docking simulations, and aiding early disease detection, ensuring faster and more reliable outcomes.',
  },
  {
    id: 3,
    questionText: 'Is my medical information safe with DeepCure AI?',
    answerText: 'Absolutely. We are committed to data security through AWS cloud infrastructure, strict HIPAA compliance, industry-grade encryption, and multilayered protection to safeguard all sensitive medical and research data.',
  },
  {
    id: 4,
    questionText: 'How do researchers and clinicians benefit from DeepCure AI?',
    answerText: 'Researchers and clinicians can leverage our platform to 1) predict molecular interactions, 2) simulate complex neurological and biochemical structures, 3) automate docking procedures, and 4) identify promising drug leads — significantly accelerating the pace of medical discovery.',
  },
  {
    id: 5,
    questionText: 'Can you build customized AI tools for research and clinical projects?',
    answerText: 'Yes, we offer tailored AI development services for academic institutions, research hospitals, and pharmaceutical companies, creating specialized machine learning and generative models to meet targeted scientific and medical needs.',
  },
]

const PLUS_ICON = 'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
const MINUS_ICON = 'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'

class FaqItem extends Component {
  state = { isActive: false }

  toggleAnswer = () => {
    this.setState(prev => ({ isActive: !prev.isActive }))
  }

  render() {
    const { faqDetails } = this.props
    const { isActive } = this.state
    const { questionText, answerText } = faqDetails

    return (
      <li className="faq-item">
        <div className="faq-header">
          <h3 className="faq-question">{questionText}</h3>
          <button type="button" className="faq-toggle" onClick={this.toggleAnswer}>
            <img
              src={isActive ? MINUS_ICON : PLUS_ICON}
              alt={isActive ? 'collapse' : 'expand'}
              className="toggle-icon"
            />
          </button>
        </div>
        {isActive && (
          <div className="faq-answer">
            <hr className="faq-separator" />
            <p>{answerText}</p>
          </div>
        )}
      </li>
    )
  }
}

const Faqs = () => (
  <div className="faqs-main-container">
    <div className="faqs-inner">
      <h1 className="faqs-title">Frequently Asked Questions</h1>
      <ul className="faqs-list">
        {faqsList.map(faq => (
          <FaqItem key={faq.id} faqDetails={faq} />
        ))}
      </ul>
    </div>
  </div>
)

export default Faqs
