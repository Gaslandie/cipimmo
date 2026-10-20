import importlib.util
from pathlib import Path
import tarfile
import unittest

spec = importlib.util.spec_from_file_location('receiver', Path(__file__).resolve().parents[1] / 'scripts/bluehost-receiver.py')
receiver = importlib.util.module_from_spec(spec)
spec.loader.exec_module(receiver)

class DeploymentTest(unittest.TestCase):
    def entry(self, name, kind=tarfile.REGTYPE):
        value = tarfile.TarInfo(name)
        value.type = kind
        value.size = 10
        return value

    def test_valid_application_paths_are_accepted(self):
        receiver.validate_members([self.entry('public/index.html'), self.entry('public/.htaccess'), self.entry('app/Models/User.php')])

    def test_private_paths_traversal_links_and_duplicate_paths_are_rejected(self):
        for entry in [self.entry('../other-site/index.php'), self.entry('/public/index.php'), self.entry('public/.env'), self.entry('storage/database.sqlite'), self.entry('public/link', tarfile.SYMTYPE), self.entry('public/link', tarfile.LNKTYPE)]:
            with self.subTest(path=entry.name, kind=entry.type), self.assertRaises(RuntimeError):
                receiver.validate_members([entry])
        with self.assertRaises(RuntimeError):
            receiver.validate_members([self.entry('public/index.html'), self.entry('public/index.html')])

    def test_expanded_size_is_bounded(self):
        entry = self.entry('public/file')
        entry.size = 1501 * 1024 * 1024
        with self.assertRaises(RuntimeError):
            receiver.validate_members([entry])

if __name__ == '__main__':
    unittest.main()
